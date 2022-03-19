import { Env } from "../env"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Value } from "../value"

export class Def {
  constructor(public mod: Mod, public name: string, public exp: Exp) {}

  refer(): Value {
    return this.exp.evaluate(this.mod, new Env())
  }
}
