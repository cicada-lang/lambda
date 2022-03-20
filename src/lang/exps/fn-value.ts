import { Env } from "../env"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Span } from "../span"
import { Value } from "../value"

export class FnValue extends Value {
  constructor(
    public mod: Mod,
    public env: Env,
    public name: string,
    public ret: Exp,
    public span: Span
  ) {
    super()
  }

  apply(arg: Value): Value {
    return this.ret.evaluate(this.mod, this.env.extend(this.name, arg))
  }

  readback(used: Set<string>): Exp {
    throw new Error("TODO")
  }

  format(): string {
    return `(lambda (${this.name}) ${this.ret.format()})`
  }
}
