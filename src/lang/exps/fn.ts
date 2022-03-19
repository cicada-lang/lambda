import { Env } from "../env"
import { Exp } from "../exp"
import { Value } from "../value"
import { Span } from "../span"

export class Fn extends Exp {
  constructor(public span: Span) {
    super()
  }

  evaluate(env: Env): Value {
    throw new Error("TODO")
  }
}
