import { Env } from "../env"
import { LangError } from "../errors"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Value } from "../value"

export class CircleWrapper extends Exp {
  constructor(public exp: Exp, public value: Value) {
    super()
  }

  freeNames(boundNames: Set<string>): Set<string> {
    return this.exp.freeNames(boundNames)
  }

  evaluate(mod: Mod, env: Env): Value {
    return this.value
  }

  format(): string {
    return this.exp.format()
  }
}
