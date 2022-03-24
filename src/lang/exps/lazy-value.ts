import { Env } from "../env"
import { EqualCtx } from "../equal"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Mod } from "../mod"
import { ReadbackCtx } from "../readback"
import { Value } from "../value"

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
    if (that instanceof Exps.LazyValue) {
      return this.equal(ctx, that.active())
    }

    return that.equal(ctx, this.active())
  }
}
