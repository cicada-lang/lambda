import { Env } from "../env"
import type { Exp } from "../exp"
import * as Exps from "../exp"
import { Mod } from "../mod"
import { Stmt } from "../stmt"
import * as Values from "../value"
import { ReadbackCtx } from "../value"

export class Compute extends Stmt {
  constructor(public exp: Exp) {
    super()
  }

  async execute(mod: Mod): Promise<void | string> {
    const value = Exps.evaluate(mod, Env.init(), this.exp)
    const exp = Values.readback(ReadbackCtx.init(), value)
    return Exps.formatExp(exp)
  }

  async undo(mod: Mod): Promise<void> {}
}
