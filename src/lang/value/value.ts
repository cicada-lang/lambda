import { EqualCtx } from "../equal"
import { Exp } from "../exp"
import { ReadbackCtx } from "../readback"

export abstract class Value {
  instanceofValue = true

  abstract is(that: Value): boolean
  abstract readback(ctx: ReadbackCtx): Exp
  abstract equal(ctx: EqualCtx, that: Value): boolean
}
