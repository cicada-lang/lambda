import { Env } from "../env"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt"

export class EvaluateStmt extends Stmt {
  constructor(public exp: Exp, public span: Span) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    const value = this.exp.evaluate(mod, new Env())
    const exp = value.readback(new Set())
    console.log(exp.format())
  }
}
