import { Env } from "../env/index.js"
import { evaluate } from "../evaluate/index.js"
import * as Exps from "../exp/index.js"
import { type Exp } from "../exp/index.js"
import { type Mod } from "../mod/index.js"
import { readback, ReadbackCtx } from "../readback/index.js"
import { Stmt } from "../stmt/index.js"

export class Compute extends Stmt {
  constructor(public exp: Exp) {
    super()
  }

  async execute(mod: Mod): Promise<void | string> {
    const value = evaluate(mod, Env.init(), this.exp)
    const exp = readback(ReadbackCtx.init(), value)
    return Exps.formatExp(exp)
  }
}
