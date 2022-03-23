import * as Exps from "../exps"
import { Neutral } from "../neutral"
import { ReadbackCtx } from "../readback"
import { Value } from "../value"

export class ApRecNeutral extends Neutral {
  constructor(public target: Value, public arg: Value) {
    super()
  }

  is(that: Neutral): boolean {
    return (
      that instanceof ApRecNeutral &&
      that.target.is(this.target) &&
      that.arg.is(this.arg)
    )
  }

  readback(ctx: ReadbackCtx): ReadbackCtx {
    ctx = this.arg.readback(ctx)
    ctx = ctx.effect((state) => {
      state.pushExp(new Exps.Var("<>"))
    })
    return ctx.effect((state) => {
      const target = state.popExpOrFail()
      const arg = state.popExpOrFail()
      state.pushExp(new Exps.Ap(target, arg))
    })
  }
}
