import { ReadbackCtx } from "../readback"

export abstract class Neutral {
  instanceofNeutral = true

  abstract preHash: string
  abstract readback(ctx: ReadbackCtx): ReadbackCtx
}
