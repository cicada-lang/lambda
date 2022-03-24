import { freshen } from "../../ut/freshen"
import { apply } from "../apply"
import { Env } from "../env"
import { EqualCtx } from "../equal"
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

  readback(ctx: ReadbackCtx): Exp {
    const freshName = freshen(ctx.usedNames, this.name)
    ctx = ctx.useName(freshName)
    const v = new Exps.VarNeutral(freshName)
    const arg = new Exps.NotYetValue(v)
    const ret = apply(this, arg)
    return new Exps.Fn(freshName, ret.readback(ctx))
  }

  equal(ctx: EqualCtx, that: Value): boolean {
    if (that instanceof Exps.LazyValue) {
      return this.equal(ctx, that.active())
    }

    const freshName = freshen(ctx.usedNames, this.name)
    ctx = ctx.useName(freshName)
    const v = new Exps.VarNeutral(freshName)
    const arg = new Exps.NotYetValue(v)
    return apply(this, arg).equal(ctx, apply(that, arg))
  }
}
