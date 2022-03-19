import { Exp } from "../exp"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt"

export class DefineStmt extends Stmt {
  constructor(public name: string, public exp: Exp, public span: Span) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    mod.define(this.name, this.exp)
  }
}
