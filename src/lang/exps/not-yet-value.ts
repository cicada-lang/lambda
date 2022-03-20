import { Exp } from "../exp"
import { Neutral } from "../neutral"
import { Span } from "../span"
import { Value } from "../value"

export class NotYetValue extends Value {
  constructor(public neutral: Neutral, public span: Span) {
    super()
  }

  readback(used: Set<string>): Exp {
    throw this.neutral.readback(used)
  }

  format(): string {
    return this.neutral.format()
  }
}
