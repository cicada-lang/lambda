import { Env } from "../env/index.js"
import { evaluate } from "../evaluate/index.js"
import * as Exps from "../exp/index.js"
import { type Exp } from "../exp/index.js"
import { type Mod } from "../mod/index.js"
import { type Value } from "../value/index.js"

export class Def {
  private cache?: Value

  constructor(
    public mod: Mod,
    public name: string,
    public exp: Exp,
  ) {}

  get value(): Value {
    if (this.cache !== undefined) return this.cache

    const exp = this.buildExp()
    this.cache = evaluate(this.mod, Env.init(), exp)
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
