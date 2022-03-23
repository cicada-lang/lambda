import { Exp } from "../exp"
import { ReadbackCtx } from "../readback"

export abstract class Value {
  instanceofValue = true

  abstract is(that: Value): boolean

  // NOTE When we have recursive definitions,
  //  `readback` does not find normal forms.
  abstract readback(ctx: ReadbackCtx): Exp
  abstract equal(ctx: ReadbackCtx, that: Value): boolean
}
