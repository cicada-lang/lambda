import { Neutral } from "../neutral"
import { ReadbackCtx } from "../readback"
import { Value } from "../value"

export class NotYetValue extends Value {
  preHash: string

  constructor(public neutral: Neutral) {
    super()
    this.preHash = neutral.preHash
  }

  readback(ctx: ReadbackCtx): ReadbackCtx {
    return this.neutral.readback(ctx)
  }
}
