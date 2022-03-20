import { Exp } from "../exp"
import * as Exps from "../exps"
import { Neutral } from "../neutral"
import { Span } from "../span"
import { Value } from "../value"

export class ApNeutral extends Neutral {
  constructor(public target: Neutral, public arg: Value, public span: Span) {
    super()
  }

  readback(used: Set<string>): Exp {
    return new Exps.Ap(
      this.target.readback(used),
      this.arg.readback(used),
      this.span
    )
  }

  format(): string {
    return `(${this.target.format()} ${this.arg.format()})`
  }
}
