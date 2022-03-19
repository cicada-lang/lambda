import { Env } from "../env"
import { Exp } from "../exp"
import { Span } from "../span"
import { Value } from "../value"

export class Fn extends Exp {
  constructor(public name: string, public ret: Exp, public span: Span) {
    super()
  }

  evaluate(env: Env): Value {
    throw new Error("TODO")
  }
}
