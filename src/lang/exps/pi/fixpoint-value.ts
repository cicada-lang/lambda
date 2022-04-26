import { Env } from "../../env"
import { EqualCtx } from "../../equal"
import { Exp } from "../../exp"
import { Mod } from "../../mod"
import { ReadbackCtx } from "../../readback"
import { Value } from "../../value"

export class FixpointValue extends Value {
  constructor(
    public mod: Mod,
    public env: Env,
    public name: string,
    public ret: Exp
  ) {
    super()
  }

  readback(ctx: ReadbackCtx): Exp {
    throw new Error()
    // const freshName = freshen(ctx.usedNames, this.name)
    // ctx = ctx.useName(freshName)
    // const v = new Exps.VarNeutral(freshName)
    // const arg = new Exps.NotYetValue(v)
    // const ret = apply(this, arg)
    // return new Exps.Fn(freshName, ret.readback(ctx))
  }

  equal(ctx: EqualCtx, that: Value): boolean {
    throw new Error()
    // const freshName = freshen(ctx.usedNames, this.name)
    // ctx = ctx.useName(freshName)
    // const v = new Exps.VarNeutral(freshName)
    // const arg = new Exps.NotYetValue(v)
    // return equal(ctx, apply(this, arg), apply(that, arg))
  }
}
