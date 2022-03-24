import { EqualCtx } from "../equal"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Neutral } from "../neutral"
import { ReadbackCtx } from "../readback"
import { Value } from "../value"

export class NotYetValue extends Value {
  constructor(public neutral: Neutral) {
    super()
  }

  equal(ctx: EqualCtx, that: Value): boolean {
    if (that instanceof Exps.LazyValue) {
      return this.equal(ctx, that.active())
    }

    return that instanceof NotYetValue && this.neutral.equal(ctx, that.neutral)
  }

  readback(ctx: ReadbackCtx): Exp {
    return this.neutral.readback(ctx)
  }
}
