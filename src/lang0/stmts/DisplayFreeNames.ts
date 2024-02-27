import * as Exps from "../exp/index.js"
import { type Exp } from "../exp/index.js"
import { type Mod } from "../mod/index.js"
import { Stmt } from "../stmt/index.js"

export class DisplayFreeNames extends Stmt {
  constructor(public exp: Exp) {
    super()
  }

  async execute(mod: Mod): Promise<void | string> {
    const freeNames = Exps.freeNames(new Set(), this.exp)
    return `(free-names ${Array.from(freeNames).join(" ")})`
  }
}
