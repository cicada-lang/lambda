import { Env } from "../env"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Value } from "../value"

export class Def {
  cache?: Value

  constructor(public mod: Mod, public name: string, public exp: Exp) {}

  refer(): Value {
    if (this.cache !== undefined) {
      return this.cache
    }

    const value = this.exp.evaluate(this.mod, new Env())
    this.cache = value
    return value
  }
}
