import { equalApply, EqualCtx } from "../equal"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { ReadbackCtx } from "../readback"
import { Value } from "../value"

export class ApThunkValue extends Value {
  constructor(public target: Value, public arg: Value) {
    super()
  }

  is(that: Value): boolean {
    return (
      that instanceof ApThunkValue &&
      that.target.is(this.target) &&
      that.arg.is(this.arg)
    )
  }

  readback(ctx: ReadbackCtx): Exp {
    return new Exps.Ap(this.target.readback(ctx), this.arg.readback(ctx))
  }

  active(): Value {
    return equalApply(this.target, this.arg)
  }

  equal(ctx: EqualCtx, that: Value): boolean {
    if (that instanceof Exps.LazyValue) {
      return this.equal(ctx, that.active())
    }

    if (
      that instanceof ApThunkValue &&
      ctx.checkOccur(this.target, that.target) &&
      this.arg.equal(ctx, that.arg)
    ) {
      return true
    }

    if (
      that instanceof ApThunkValue &&
      this.target.equal(ctx, that.target) &&
      this.arg.equal(ctx, that.arg)
    ) {
      return true
    }

    if (that instanceof Exps.ApThunkValue) {
      return this.active().equal(ctx, that.active())
    }

    return this.active().equal(ctx, that)
  }
}
