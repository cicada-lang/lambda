import { Env } from "../env"
import * as Exps from "../exp"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { ReadbackCtx } from "../readback"
import { Stmt } from "../stmt"

export class Compute extends Stmt {
  constructor(public exp: Exp) {
    super()
  }

  async execute(mod: Mod): Promise<void | string> {
    const value = Exps.evaluate(mod, Env.init(), this.exp)
    const exp = value.readback(ReadbackCtx.init())
    return Exps.formatExp(exp)
  }

  async undo(mod: Mod): Promise<void> {}
}
