import { Exp } from "../exp"
import { Env } from "../env"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt"

export class ExpStmt extends Stmt {
  constructor(public exp: Exp, public span: Span) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    const value = this.exp.evaluate(mod, new Env())
    console.dir(value, { depth: null })
  }
}
