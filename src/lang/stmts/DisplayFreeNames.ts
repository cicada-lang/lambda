import type { Exp } from "../exp"
import * as Exps from "../exp"
import type { Mod } from "../mod"
import { Stmt } from "../stmt"

export class DisplayFreeNames extends Stmt {
  constructor(public exp: Exp) {
    super()
  }

  async execute(mod: Mod): Promise<void | string> {
    const freeNames = Exps.freeNames(new Set(), this.exp)
    return `(free-names ${Array.from(freeNames).join(" ")})`
  }

  async undo(mod: Mod): Promise<void> {}
}
