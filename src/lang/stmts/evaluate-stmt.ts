import { Env } from "../env"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Stmt } from "../stmt"

export class EvaluateStmt extends Stmt {
  constructor(public exp: Exp) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    const value = this.exp.evaluate(mod, new Env())
    const exp = value.readback(new Set())
    const output = exp.format()
    console.log(output)
    mod.output += output + "\n"
  }
}
