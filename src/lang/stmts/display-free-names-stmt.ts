import { Exp } from "../exp"
import { Mod } from "../mod"
import { Stmt } from "../stmt"

export class DisplayFreeNamesStmt extends Stmt {
  constructor(public exp: Exp) {
    super()
  }

  async execute(mod: Mod): Promise<void | string> {
    const freeNames = this.exp.freeNames(new Set())
    return `(free-names ${Array.from(freeNames).join(" ")})`
  }

  async undo(mod: Mod): Promise<void> {}
}
