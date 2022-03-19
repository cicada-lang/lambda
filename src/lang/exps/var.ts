import { Env } from "../env"
import { LangError } from "../errors"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Span } from "../span"
import { Value } from "../value"

export class Var extends Exp {
  constructor(public name: string, public span: Span) {
    super()
  }

  evaluate(mod: Mod, env: Env): Value {
    let value = undefined

    value = env.lookup(this.name)
    if (value !== undefined) {
      return value
    }

    value = mod.lookup(this.name)
    if (value !== undefined) {
      return value
    }

    throw new LangError(`Unknown name: ${this.name}`, this.span)
  }

  format(): string {
    return this.name
  }
}
