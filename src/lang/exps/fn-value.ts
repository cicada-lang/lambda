import { freshen } from "../../ut/freshen"
import { Env } from "../env"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Mod } from "../mod"
import { ReadbackCtx, ReadbackEffect } from "../readback"
import { Value } from "../value"

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
    return (
      that instanceof FnValue &&
      that.name === this.name &&
      that.ret.format() === this.ret.format() &&
      this.isEnv(that.env)
    )
  }

  isEnv(env: Env): boolean {
    const freeNames = this.ret.freeNames(new Set([this.name]))
    for (const freeName of freeNames) {
      const thisValue = this.env.lookup(freeName)
      const thatValue = env.lookup(freeName)

      if (
        (thisValue === undefined && thatValue === undefined) ||
        (thisValue !== undefined &&
          thatValue !== undefined &&
          thisValue.is(thatValue))
      ) {
        continue
      } else {
        return false
      }
    }

    return true
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
    // TODO The following `apply` is divergent.
    const ret = Exps.Ap.apply(this, variable)
    ctx = ctx.useName(freshName)
    const effect: ReadbackEffect = (state) => {
      const ret = state.popExpOrFail()
      state.pushExp(new Exps.Fn(freshName, ret))
    }
    ctx = ctx.parent(this, effect)
    // TODO during the following `readback`,
    //   the `effect` is not pushed yet.
    ctx = ret.readback(ctx)
    return ctx.effect(effect)
  }
}
