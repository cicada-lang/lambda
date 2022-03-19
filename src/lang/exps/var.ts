import { Env } from "../env"
import { Exp } from "../exp"
import { Span } from "../span"
import { Value } from "../value"
import { LangError } from "../errors"

export class Var extends Exp {
  constructor(public name: string, public span: Span) {
    super()
  }

  evaluate(env: Env): Value {
    const value = env.lookup(this.name)
    if (value === undefined) {
      throw new LangError(`Unknown name: ${this.name}`, this.span)
    }

    return value
  }
}
