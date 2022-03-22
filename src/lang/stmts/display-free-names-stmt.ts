import { Exp } from "../exp"
import { Mod } from "../mod"
import { Stmt } from "../stmt"

export class DisplayFreeNamesStmt extends Stmt {
  constructor(public exp: Exp) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    const freeNames = this.exp.freeNames(new Set())
    const output = `(free-names ${Array.from(freeNames).join(" ")})`
    console.log(output)
    mod.output += output + "\n"
  }
}
