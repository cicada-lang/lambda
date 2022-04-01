import { Exp } from "../exp"
import { Mod } from "../mod"
import { Stmt } from "../stmt"

export class CommentsStmt extends Stmt {
  constructor(public exps: Array<Exp>) {
    super()
  }

  async execute(mod: Mod): Promise<void | string> {}

  async undo(mod: Mod): Promise<void> {}
}
