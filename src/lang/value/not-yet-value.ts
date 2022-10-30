import { EqualCtx } from "../equal"
import { Exp } from "../exp"
import * as Neutrals from "../neutral"
import { Neutral } from "../neutral"
import { ReadbackCtx } from "../readback"
import * as Values from "../value"
import { Value } from "../value"

export class NotYetValue extends Value {
  constructor(public neutral: Neutral) {
    super()
  }

  equal(ctx: EqualCtx, that: Value): boolean {
    return that instanceof NotYetValue && this.neutral.equal(ctx, that.neutral)
  }

  readback(ctx: ReadbackCtx): Exp {
    return this.neutral.readback(ctx)
  }

  apply(arg: Value): Value {
    return new Values.NotYetValue(new Neutrals.ApNeutral(this.neutral, arg))
  }
}
