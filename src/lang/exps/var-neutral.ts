import { Exp } from "../exp"
import * as Exps from "../exps"
import { Neutral } from "../neutral"
import { Span } from "../span"

export class VarNeutral extends Neutral {
  constructor(public name: string, public span: Span) {
    super()
  }

  readback(used: Set<string>): Exp {
    return new Exps.Var(this.name, this.span)
  }

  format(): string {
    return this.name
  }
}
