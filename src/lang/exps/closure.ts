import { Env } from "../env"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Value } from "../value"

export class Closure {
  constructor(
    public mod: Mod,
    public env: Env,
    public name: string,
    public ret: Exp
  ) {}

  apply(arg: Value): Value {
    return this.ret.evaluate(this.mod, this.env.extend(this.name, arg))
  }
}
