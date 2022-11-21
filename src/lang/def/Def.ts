import { Env } from "../env"
import type { Exp } from "../exp"
import * as Exps from "../exp"
import type { Mod } from "../mod"
import type { Value } from "../value"

export class Def {
  private cache?: Value

  constructor(public mod: Mod, public name: string, public exp: Exp) {}

  get value(): Value {
    if (this.cache !== undefined) return this.cache

    const exp = this.buildExp()
    this.cache = Exps.evaluate(this.mod, Env.init(), exp)
    return this.cache
  }

  private buildExp(): Exp {
    if (this.isRecursive()) {
      return Exps.Fixpoint(this.name, this.exp)
    }

    return this.exp
  }

  private isRecursive(): boolean {
    const freeNames = Exps.freeNames(new Set(), this.exp)
    return freeNames.has(this.name)
  }
}
