import { Env } from "../env"
import { Exp } from "../exp"
import { Value } from "../value"

export class Closure {
  constructor(public env: Env, public name: string, public ret: Exp) {}

  apply(arg: Value): Value {
    return this.ret.evaluate(this.env.extend(this.name, arg))
  }
}
