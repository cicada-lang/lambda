import { Env } from "../env"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Value } from "../value"

export class CircleRef extends Exp {
  constructor(public value: Value, public id: string) {
    super()
  }

  freeNames(boundNames: Set<string>): Set<string> {
    return new Set()
  }

  evaluate(mod: Mod, env: Env, parents: Array<Value>): Value {
    return this.value
  }

  format(): string {
    return `#${this.id}`
  }
}
