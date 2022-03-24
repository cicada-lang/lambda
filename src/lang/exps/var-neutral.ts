import { EqualCtx } from "../equal"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Neutral } from "../neutral"
import { ReadbackCtx } from "../readback"

export class VarNeutral extends Neutral {
  constructor(public name: string) {
    super()
  }

  readback(ctx: ReadbackCtx): Exp {
    return new Exps.Var(this.name)
  }

  equal(ctx: EqualCtx, that: Neutral): boolean {
    return that instanceof VarNeutral && that.name === this.name
  }
}
