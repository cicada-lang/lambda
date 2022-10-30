import { EqualCtx } from "../equal"
import { Exp } from "../exp"
import { Neutral } from "../neutral"
import { ReadbackCtx } from "../readback"
import * as Values from "../value"

export class FixpointNeutral extends Neutral {
  constructor(public fixpoint: Values.FixpointValue) {
    super()
  }

  readback(ctx: ReadbackCtx): Exp {
    return this.fixpoint.readback(ctx)
  }

  equal(ctx: EqualCtx, that: Neutral): boolean {
    return (
      that instanceof FixpointNeutral &&
      this.fixpoint.wrapper().equal(ctx, that.fixpoint.wrapper())
    )
  }
}
