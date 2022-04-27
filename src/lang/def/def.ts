import { Env } from "../env"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Mod } from "../mod"
import { Value } from "../value"

export class Def {
  private cache?: Value

  constructor(public mod: Mod, public name: string, public exp: Exp) {}

  dependencies(): Array<{ name: string; def?: string }> {
    const freeNames = this.exp.freeNames(new Set())
    return Array.from(freeNames).map((name) => ({
      name,
      def: this.mod.find(name)?.exp.format(),
    }))
  }

  get value(): Value {
    if (this.cache !== undefined) return this.cache

    const exp = this.buildExp()
    this.cache = exp.evaluate(this.mod, Env.init())

    // console.log({
    //   name: this.name,
    //   dependencies: this.dependencies(),
    // })

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
