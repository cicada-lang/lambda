import { Neutral } from "../neutral"
import { ReadbackCtx } from "../readback"
import { Value } from "../value"

export class NotYetValue extends Value {
  constructor(public neutral: Neutral) {
    super()
  }

  get preHash(): string {
    return this.neutral.preHash
  }

  readback(ctx: ReadbackCtx): ReadbackCtx {
    return this.neutral.readback(ctx)
  }
}
