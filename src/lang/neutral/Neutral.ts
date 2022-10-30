import { EqualCtx } from "../equal"
import { Exp } from "../exp"
import { ReadbackCtx } from "../readback"

export abstract class Neutral {
  instanceofNeutral = true

  abstract readback(ctx: ReadbackCtx): Exp
  abstract equal(ctx: EqualCtx, that: Neutral): boolean
}
