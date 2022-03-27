import { Env } from "../env"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { ReadbackCtx } from "../readback"
import { Stmt } from "../stmt"

export class CommentsStmt extends Stmt {
  constructor(public exps: Array<Exp>) {
    super()
  }

  async execute(mod: Mod): Promise<void> {}
}
