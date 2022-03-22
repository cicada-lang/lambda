const crypto = require("crypto-browserify")
import { ReadbackCtx } from "../readback"

export abstract class Value {
  instanceofValue = true

  abstract preHash: string

  get hash(): string {
    return crypto.createHash("sha256").update(this.preHash).digest("base64")
  }

  // NOTE When we have recursive definitions,
  //  `readback` does not find normal forms.
  abstract readback(ctx: ReadbackCtx): ReadbackCtx
}
