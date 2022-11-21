import { Env } from "../env"
import { evaluate } from "../evaluate"
import type { Exp } from "../exp"
import * as Exps from "../exp"
import type { Mod } from "../mod"
import { readback, ReadbackCtx } from "../readback"
import { Stmt } from "../stmt"

export class Compute extends Stmt {
  constructor(public exp: Exp) {
    super()
  }

  async execute(mod: Mod): Promise<void | string> {
    const value = evaluate(mod, Env.init(), this.exp)
    const exp = readback(ReadbackCtx.init(), value)
    return Exps.formatExp(exp)
  }

  async undo(mod: Mod): Promise<void> {}
}
