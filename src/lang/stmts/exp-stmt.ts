import { Span } from "../span"
import { Stmt } from "../stmt"
import { Exp } from "../exp"
import { Mod } from "../mod"

export class ExpStmt extends Stmt {
  constructor(public exp: Exp, public span: Span) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    throw new Error("TODO")
    // const value = this.exp.evaluate(mod.toEnv())
    // console.log(value)
  }
}
