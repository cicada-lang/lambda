import { Def } from "../def"
import { Env } from "../env"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Mod } from "../mod"
import { Stmt } from "../stmt"

export class DefineStmt extends Stmt {
  constructor(public name: string, public exp: Exp) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    if (this.isRecursive()) {
      const fixpoint = new Exps.Fixpoint(this.name, this.exp)
      const value = fixpoint.evaluate(mod, Env.init())
      mod.define(this.name, new Def(mod, this.name, value))
    } else {
      const value = this.exp.evaluate(mod, Env.init())
      mod.define(this.name, new Def(mod, this.name, value))
    }
  }

  private isRecursive(): boolean {
    const freeNames = this.exp.freeNames(new Set())
    return freeNames.has(this.name)
  }

  async undo(mod: Mod): Promise<void> {
    mod.delete(this.name)
  }
}
