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

  is(that: Value): boolean {
    return (
      that instanceof LazyValue &&
      this.exp.format() == that.exp.format() &&
      this.isEnv(that.env)
    )
  }

  isEnv(env: Env): boolean {
    const freeNames = this.exp.freeNames(new Set())
    for (const freeName of freeNames) {
      const thisValue = this.env.lookup(freeName)
      const thatValue = env.lookup(freeName)

      if (
        (thisValue === undefined && thatValue === undefined) ||
        (thisValue !== undefined &&
          thatValue !== undefined &&
          thisValue.is(thatValue))
      ) {
        continue
      } else {
        return false
      }
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

  readback(ctx: ReadbackCtx): ReadbackCtx {
    return this.active(ctx.parents.map(({ value }) => value)).readback(ctx)
  }
}
