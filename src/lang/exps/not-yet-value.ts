import { Exp } from "../exp"
import { Neutral } from "../neutral"
import { Value } from "../value"

export class NotYetValue extends Value {
  constructor(public neutral: Neutral) {
    super()
  }

  readback(used: Set<string>): Exp {
    return this.neutral.readback(used)
  }
}
