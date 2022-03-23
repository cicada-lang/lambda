import { Env } from "../env"
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
      this.isEnv(that.env)
    )
  }

  private isEnv(env: Env): boolean {
    const freeNames = this.exp.freeNames(new Set())

    for (const freeName of freeNames) {
      const thisValue = this.env.lookup(freeName)
      const thatValue = env.lookup(freeName)

      if (thisValue === undefined && thatValue === undefined) {
        continue
      }

      if (
        thisValue !== undefined &&
        thatValue !== undefined &&
        thisValue.is(thatValue)
      ) {
        continue
      }

      return false
    }

    return true
  }

  active(parents: Array<Value>): Value {
    if (this.cache !== undefined) {
      return this.cache
    }

    const value = this.exp.evaluate(this.mod, this.env, parents)
    this.cache = value
    return value
  }

  readback(ctx: ReadbackCtx): Exp {
    return this.active(ctx.parents).readback(ctx)
  }

  equal(ctx: ReadbackCtx, that: Value): boolean {
    if (that instanceof Exps.LazyValue) {
      return this.equal(ctx, that.active(ctx.parents))
    }

    return that.equal(ctx, this.active(ctx.parents))
  }
}
