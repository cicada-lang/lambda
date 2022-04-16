import { Def } from "../def"
import { Env } from "../env"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Stmt } from "../stmt"

export class DefineStmt extends Stmt {
  constructor(public name: string, public exp: Exp) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    const value = this.exp.evaluate(mod, Env.init())
    mod.define(this.name, new Def(mod, this.name, value))
  }

  async undo(mod: Mod): Promise<void> {
    mod.delete(this.name)
  }
}
