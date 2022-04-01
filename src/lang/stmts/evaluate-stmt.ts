import { Env } from "../env"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { ReadbackCtx } from "../readback"
import { Stmt } from "../stmt"

export class EvaluateStmt extends Stmt {
  constructor(public exp: Exp) {
    super()
  }

  async execute(mod: Mod): Promise<void | string> {
    const value = this.exp.evaluate(mod, Env.init())
    const exp = value.readback(ReadbackCtx.init())
    return exp.format()
  }

  async undo(mod: Mod): Promise<void> {}
}
