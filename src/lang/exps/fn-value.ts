import { freshen } from "../../ut/freshen"
import { Env } from "../env"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Mod } from "../mod"
import { ReadbackCtx, ReadbackEffect } from "../readback"
import { Value } from "../value"
import { isLogicVar } from "../value/is-logic-var"

export class FnValue extends Value {
  constructor(
    public mod: Mod,
    public env: Env,
    public name: string,
    public ret: Exp
  ) {
    super()
  }

  is(that: Value): boolean {
    const result = (
      that instanceof FnValue &&
      that.name === this.name &&
      that.ret.format() === this.ret.format()
    )
    if (result) {
      console.log(this.env, that.env)
    }
    return result
  }

  apply(arg: Value): Value {
    return this.ret.evaluate(this.mod, this.env.extend(this.name, arg))
  }

  readback(ctx: ReadbackCtx): ReadbackCtx {
    const foundEffect = ctx.checkCircle(this)
    if (foundEffect !== undefined) {
      console.log("checkCircle")
      ctx = ctx.replaceEffect(foundEffect, (state) => {
        foundEffect(state)
        const exp = state.popExpOrFail()
        state.pushExp(new Exps.CircleWrapper(exp, this))
      })

      return ctx.effect((state) => {
        state.pushExp(new Exps.CircleRef(this))
      })
    }

    const freshName = freshen(ctx.usedNames, this.name)
    const variable = new Exps.NotYetValue(new Exps.VarNeutral(freshName))
    const ret = Exps.Ap.apply(this, variable)
    ctx = ctx.useName(freshName)
    const effect: ReadbackEffect = (state) => {
      const ret = state.popExpOrFail()
      state.pushExp(new Exps.Fn(freshName, ret))
    }
    ctx = ctx.parent(this, effect)
    ctx = ret.readback(ctx)
    return ctx.effect(effect)
  }
}
