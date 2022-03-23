import { Env } from "../env"
import { LangError } from "../errors"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Value } from "../value"

export class CircleRef extends Exp {
  constructor(public value: Value) {
    super()
  }

  freeNames(boundNames: Set<string>): Set<string> {
    return new Set()
  }

  evaluate(mod: Mod, env: Env): Value {
    return this.value
  }

  format(): string {
    return "CircleRef-TODO"
  }
}
