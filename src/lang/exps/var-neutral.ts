import * as Exps from "../exps"
import { Neutral } from "../neutral"
import { ReadbackCtx } from "../readback"

export class VarNeutral extends Neutral {
  constructor(public name: string) {
    super()
  }

  get preHash(): string {
    return this.name
  }

  readback(ctx: ReadbackCtx): ReadbackCtx {
    return ctx.effect((state) => {
      state.pushExp(new Exps.Var(this.name))
    })
  }
}
