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

  get preHash(): string {
    const freeNames: Array<string> = [
      ...this.ret.freeNames(new Set([this.name])),
    ].sort()

    const envPreHash = freeNames
      .map((freeName) => {
        const value = this.env.lookup(freeName)
        if (value === undefined) return `(${freeName})`
        if (isLogicVar(value)) return `(${freeName})`
        return `(${freeName} ${value.preHash})`
      })
      .join(" ")

    return `(lambda-pre-hash (${this.name}) ${this.ret.format()} ${envPreHash})`
  }

  apply(arg: Value): Value {
    return this.ret.evaluate(this.mod, this.env.extend(this.name, arg))
  }

  readback(ctx: ReadbackCtx): ReadbackCtx {
    const foundEffect = ctx.checkCircle(this)
    if (foundEffect !== undefined) {
      console.log("checkCircle:", this.preHash)
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
