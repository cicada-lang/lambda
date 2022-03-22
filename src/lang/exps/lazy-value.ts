import { Env } from "../env"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { ReadbackCtx } from "../readback"
import { Value } from "../value"
import { isLogicVar } from "../value/is-logic-var"

export class LazyValue extends Value {
  cache?: Value
  preHash: string

  constructor(public mod: Mod, public env: Env, public exp: Exp) {
    super()
    this.preHash = this.createPreHash()
  }

  createPreHash(): string {
    const freeNames: Array<string> = [...this.exp.freeNames(new Set())].sort()

    const envPreHash = freeNames
      .map((freeName) => {
        const value = this.env.lookup(freeName)
        if (value === undefined) return `(${freeName})`
        if (isLogicVar(value)) return `(${freeName})`
        return `(${freeName} {value.preHash})`
      })
      .join(" ")

    return `(lazy-pre-hash ${this.exp.format()} ${envPreHash})`
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
