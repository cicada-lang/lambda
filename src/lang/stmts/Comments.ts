import type { Exp } from "../exp/index.js"
import type { Mod } from "../mod/index.js"
import { Stmt } from "../stmt/index.js"

export class Comments extends Stmt {
  constructor(public exps: Array<Exp>) {
    super()
  }

  async execute(mod: Mod): Promise<void> {}

  async undo(mod: Mod): Promise<void> {}
}
