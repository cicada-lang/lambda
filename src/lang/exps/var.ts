import { Env } from "../env"
import { Exp } from "../exp"
import { Value } from "../value"

export class Var extends Exp {
  constructor(public name: string) {
    super()
  }

  evaluate(env: Env): Value {
    throw new Error("TODO")
  }
}
