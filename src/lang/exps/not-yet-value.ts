import { Exp } from "../exp"
import * as Exps from "../exps"
import { Neutral } from "../neutral"
import { ReadbackCtx } from "../readback"
import { Value } from "../value"

export class NotYetValue extends Value {
  constructor(public neutral: Neutral) {
    super()
  }

  is(that: Value): boolean {
    return that instanceof NotYetValue && this.neutral.is(that.neutral)
  }

  equal(ctx: ReadbackCtx, that: Value): boolean {
    if (that instanceof Exps.LazyValue) {
      return this.equal(ctx, that.active(ctx.parents))
    }

    return that instanceof NotYetValue && this.neutral.equal(ctx, that.neutral)
  }

  readback(ctx: ReadbackCtx): Exp {
    return this.neutral.readback(ctx)
  }
}
