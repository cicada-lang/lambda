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

  is(that: Value): boolean {
    return (
      that instanceof LazyValue &&
      this.exp.format() == that.exp.format() &&
      this.env.is(this.exp.freeNames(new Set()), that.env)
    )
  }

  active(): Value {
    if (this.cache !== undefined) {
      return this.cache
    }

    const value = this.exp.equalEvaluate(this.mod, this.env)
    this.cache = value
    return value
  }

  readback(ctx: ReadbackCtx): Exp {
    return this.active().readback(ctx)
  }

  equal(ctx: EqualCtx, that: Value): boolean {
    if (that instanceof Exps.LazyValue || that instanceof Exps.ApThunkValue) {
      return this.equal(ctx, that.active())
    }

    return that.equal(ctx, this.active())
  }
}
