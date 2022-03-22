import * as Exps from "../exps"
import { Neutral } from "../neutral"
import { ReadbackCtx } from "../readback"
import { Value } from "../value"

export class ApNeutral extends Neutral {
  constructor(public target: Neutral, public arg: Value) {
    super()
  }

  get preHash(): string {
    return `(${this.target.preHash} ${this.arg.preHash})`
  }

  readback(ctx: ReadbackCtx): ReadbackCtx {
    ctx = this.arg.readback(ctx)
    ctx = this.target.readback(ctx)
    return ctx.effect((state) => {
      const target = state.popExpOrFail()
      const arg = state.popExpOrFail()
      state.pushExp(new Exps.Ap(target, arg))
    })
  }
}
