import { Env } from "../env"
import { Exp } from "../exp"
import { Value } from "../value"
import { Span } from "../span"

export class Var extends Exp {
  constructor(public name: string, public span: Span) {
    super()
  }

  evaluate(env: Env): Value {
    const value = env.lookup(this.name)
    if (value === undefined) {
      throw new Error(`Unknown name: ${this.name}`)
    }

    return value
  }
}
