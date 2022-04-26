import { Env } from "../../env"
import { Exp } from "../../exp"
import * as Exps from "../../exps"
import { Mod } from "../../mod"
import { Value } from "../../value"

export class Fixpoint extends Exp {
  constructor(public name: string, public ret: Exp) {
    super()
  }

  freeNames(boundNames: Set<string>): Set<string> {
    return this.ret.freeNames(new Set([...boundNames, this.name]))
  }

  evaluate(mod: Mod, env: Env): Value {
    return new Exps.FixpointValue(mod, env, this.name, this.ret)
  }

  format(): string {
    return `(fixpoint ${this.name} ${this.ret.format()})`
  }
}
