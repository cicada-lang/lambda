import { Span } from "../span"
import { Stmt } from "../stmt"
import { Exp } from "../exp"
import { Mod } from "../mod"

export class DefineStmt extends Stmt {
  constructor(public name: string, public exp: Exp, public span: Span) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    mod.define(this.name, this.exp)
  }
}
