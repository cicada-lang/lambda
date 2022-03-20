import { Env } from "../env"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Span } from "../span"
import { Value } from "../value"
import { Neutral } from "../neutral"

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
