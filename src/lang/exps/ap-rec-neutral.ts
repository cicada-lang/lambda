import { Exp } from "../exp"
import * as Exps from "../exps"
import { Neutral } from "../neutral"
import { ReadbackCtx } from "../readback"
import { Value } from "../value"

export class ApRecNeutral extends Neutral {
  constructor(public target: Value, public arg: Value) {
    super()
  }

  is(that: Neutral): boolean {
    return (
      that instanceof ApRecNeutral &&
      that.target.is(this.target) &&
      that.arg.is(this.arg)
    )
  }

  readback(ctx: ReadbackCtx): Exp {
    return new Exps.Ap(this.target.readback(ctx), this.arg.readback(ctx))
  }

  equal(ctx: ReadbackCtx, that: Neutral): boolean {
    return (
      that instanceof ApRecNeutral &&
      that.target.equal(ctx, this.target) &&
      that.arg.equal(ctx, this.arg)
    )
  }
}
