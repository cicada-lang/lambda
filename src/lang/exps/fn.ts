import { Env } from "../env"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Mod } from "../mod"
import { Value } from "../value"

export class Fn extends Exp {
  constructor(public name: string, public ret: Exp) {
    super()
  }

  evaluate(mod: Mod, env: Env): Value {
    return new Exps.FnValue(mod, env, this.name, this.ret)
  }

  format(): string {
    return `(lambda (${this.name}) ${this.ret.format()})`
  }
}
