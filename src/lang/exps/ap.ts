import { Env } from "../env"
import { Exp } from "../exp"
import { Span } from "../span"
import { Value } from "../value"

export class Ap extends Exp {
  constructor(public target: Exp, public arg: Exp, public span: Span) {
    super()
  }

  evaluate(env: Env): Value {
    throw new Error("TODO")
  }
}
