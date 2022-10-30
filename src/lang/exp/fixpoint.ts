import { Env } from "../env"
import { Exp } from "../exp"
import { Mod } from "../mod"
import * as Values from "../value"
import { Value } from "../value"

export class Fixpoint extends Exp {
  constructor(public name: string, public body: Exp) {
    super()
  }

  freeNames(boundNames: Set<string>): Set<string> {
    return this.body.freeNames(new Set([...boundNames, this.name]))
  }

  evaluate(mod: Mod, env: Env): Value {
    return new Values.FixpointValue(mod, env, this.name, this.body)
  }

  format(): string {
    return `(fixpoint ${this.name} ${this.body.format()})`
  }
}
