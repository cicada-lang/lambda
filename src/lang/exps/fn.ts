import { Env } from "../env"
import { Exp } from "../exp"
import { Value } from "../value"

export class Fn extends Exp {
  constructor() {
    super()
  }

  evaluate(env: Env): Value {
    throw new Error("TODO")
  }
}
