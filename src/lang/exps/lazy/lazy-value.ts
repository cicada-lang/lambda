import { Env } from "../../env"
import { equal, EqualCtx } from "../../equal"
import { Exp } from "../../exp"
import { Mod } from "../../mod"
import { ReadbackCtx } from "../../readback"
import { Value } from "../../value"

export class LazyValue extends Value {
  cache?: Value

  constructor(public mod: Mod, public env: Env, public exp: Exp) {
    super()
  }

  active(): Value {
    if (this.cache !== undefined) {
      return this.cache
    }

    const value = this.exp.evaluate(this.mod, this.env)
    this.cache = value
    return value
  }

  readback(ctx: ReadbackCtx): Exp {
    return this.active().readback(ctx)
  }

  equal(ctx: EqualCtx, that: Value): boolean {
    return equal(ctx, this.active(), that)
  }
}
