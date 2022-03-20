import { Exp } from "../exp"
import { Mod } from "../mod"
import { Stmt } from "../stmt"

export class DefineStmt extends Stmt {
  constructor(public name: string, public exp: Exp) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    mod.define(this.name, this.exp)
  }
}
