import { Exp } from "../exp"
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
    return that instanceof NotYetValue && this.neutral.equal(ctx, that.neutral)
  }

  readback(ctx: ReadbackCtx): Exp {
    return this.neutral.readback(ctx)
  }
}
