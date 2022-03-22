import * as Exps from "../exps"
import { Neutral } from "../neutral"
import { ReadbackCtx } from "../readback"

export class VarNeutral extends Neutral {
  preHash: string

  constructor(public name: string) {
    super()
    this.preHash = name
  }

  readback(ctx: ReadbackCtx): ReadbackCtx {
    return ctx.effect((state) => {
      state.expStack.push(new Exps.Var(this.name))
    })
  }
}
