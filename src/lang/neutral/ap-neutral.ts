import { equal, EqualCtx } from "../equal"
import * as Exps from "../exp"
import { Exp } from "../exp"
import { Neutral } from "../neutral"
import { ReadbackCtx } from "../readback"
import { Value } from "../value"

export class ApNeutral extends Neutral {
  constructor(public target: Neutral, public arg: Value) {
    super()
  }

  readback(ctx: ReadbackCtx): Exp {
    return new Exps.Ap(this.target.readback(ctx), this.arg.readback(ctx))
  }

  equal(ctx: EqualCtx, that: Neutral): boolean {
    return (
      that instanceof ApNeutral &&
      this.target.equal(ctx, that.target) &&
      equal(ctx, this.arg, that.arg)
    )
  }
}
