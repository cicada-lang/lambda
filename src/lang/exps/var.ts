import { Env } from "../env"
import { LangError } from "../errors"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Value } from "../value"

export class Var extends Exp {
  constructor(public name: string) {
    super()
  }

  freeNames(boundNames: Set<string>): Set<string> {
    return boundNames.has(this.name) ? new Set() : new Set([this.name])
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

    throw new LangError(`Unknown name: ${this.name}`)
  }

  format(): string {
    return this.name
  }
}
