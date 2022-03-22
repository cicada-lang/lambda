import { freshen } from "../../ut/freshen"
import { Env } from "../env"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Mod } from "../mod"
import { ReadbackCtx } from "../readback"
import { Value } from "../value"

export class FnValue extends Value {
  preHash: string

  constructor(
    public mod: Mod,
    public env: Env,
    public name: string,
    public ret: Exp
  ) {
    super()
    this.preHash = this.createPreHash()
  }

  createPreHash(): string {
    const freeNames: Array<string> = [
      ...this.ret.freeNames(new Set([this.name])),
    ].sort()

    const envPreHash = freeNames
      .map((freeName) => {
        const value = this.env.lookup(freeName)
        return value ? `(${freeName} ${value.preHash})` : `(${freeName})`
      })
      .join(" ")

    return `(lambda-pre-hash (${this.name}) ${this.ret.format()} ${envPreHash})`
  }

  apply(arg: Value): Value {
    return this.ret.evaluate(this.mod, this.env.extend(this.name, arg))
  }

  readback(ctx: ReadbackCtx): ReadbackCtx {
    const freshName = freshen(ctx.usedNames, this.name)
    const variable = new Exps.NotYetValue(new Exps.VarNeutral(freshName))
    const ret = Exps.Ap.apply(this, variable)
    ctx = ctx.useName(freshName)
    ctx = ret.readback(ctx)
    return ctx.effect((state) => {
      const ret = state.popExpOrFail()
      state.pushExp(new Exps.Fn(freshName, ret))
    })
  }
}
