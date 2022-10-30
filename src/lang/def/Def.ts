import { Env } from "../env"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Mod } from "../mod"
import { Value } from "../value"

export class Def {
  private cache?: Value

  constructor(public mod: Mod, public name: string, public exp: Exp) {}

  get value(): Value {
    if (this.cache !== undefined) return this.cache

    const exp = this.buildExp()
    this.cache = exp.evaluate(this.mod, Env.init())
    return this.cache
  }

  private buildExp(): Exp {
    if (this.isRecursive()) {
      return new Exps.Fixpoint(this.name, this.exp)
    }

    return this.exp
  }

  private isRecursive(): boolean {
    const freeNames = this.exp.freeNames(new Set())
    return freeNames.has(this.name)
  }
}
