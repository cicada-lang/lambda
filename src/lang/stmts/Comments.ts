import type { Exp } from "../exp"
import type { Mod } from "../mod"
import { Stmt } from "../stmt"

export class Comments extends Stmt {
  constructor(public exps: Array<Exp>) {
    super()
  }

  async execute(mod: Mod): Promise<void> {}

  async undo(mod: Mod): Promise<void> {}
}
