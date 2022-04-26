import { freshen } from "../../../ut/freshen"
import { apply } from "../../apply"
import { Env } from "../../env"
import { EqualCtx } from "../../equal"
import { Exp } from "../../exp"
import * as Exps from "../../exps"
import { Mod } from "../../mod"
import { ReadbackCtx } from "../../readback"
import { Value } from "../../value"

export class FixpointValue extends Value {
  constructor(
    public mod: Mod,
    public env: Env,
    public name: string,
    public body: Exp
  ) {
    super()
  }

  readback(ctx: ReadbackCtx): Exp {
    const freshName = freshen(ctx.usedNames, this.name)
    ctx = ctx.useName(freshName)
    const v = new Exps.VarNeutral(freshName)
    const arg = new Exps.NotYetValue(v)
    const body = apply(this, arg)
    return new Exps.Fixpoint(freshName, body.readback(ctx))
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
