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

  readback(ctx: ReadbackCtx): ReadbackCtx {
    return this.neutral.readback(ctx)
  }
}
