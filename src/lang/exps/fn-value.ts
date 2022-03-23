import { freshen } from "../../ut/freshen"
import { Env } from "../env"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Mod } from "../mod"
import { ReadbackCtx } from "../readback"
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

  apply(arg: Value, parents: Array<Value>): Value {
    return this.ret.evaluate(this.mod, this.env.extend(this.name, arg), parents)
  }

  readback(ctx: ReadbackCtx): Exp {
    const freshName = freshen(ctx.usedNames, this.name)
    ctx = ctx.useName(freshName)
    ctx = ctx.parent(this)
    const variable = new Exps.NotYetValue(new Exps.VarNeutral(freshName))
    const ret = Exps.Ap.apply(this, variable, ctx.parents)
    return new Exps.Fn(freshName, ret.readback(ctx))
  }
}
