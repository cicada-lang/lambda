import { Env } from "../env"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { ReadbackCtx } from "../readback"
import { Value } from "../value"

export class LazyValue extends Value {
  cache?: Value

  constructor(public mod: Mod, public env: Env, public exp: Exp) {
    super()
  }

  get preHash(): string {
    return this.active().preHash
  }

  active(): Value {
    if (this.cache !== undefined) {
      return this.cache
    }

    const value = this.exp.evaluate(this.mod, this.env)
    this.cache = value
    return value
  }

  readback(ctx: ReadbackCtx): ReadbackCtx {
    return this.active().readback(ctx)
  }
}
