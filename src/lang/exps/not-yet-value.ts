import { Exp } from "../exp"
import { Neutral } from "../neutral"
import { Value } from "../value"

export class NotYetValue extends Value {
  preHash: string

  constructor(public neutral: Neutral) {
    super()
    this.preHash = neutral.preHash
  }

  readback(used: Set<string>): Exp {
    return this.neutral.readback(used)
  }
}
