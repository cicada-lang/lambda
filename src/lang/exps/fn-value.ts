import { Env } from "../env"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Mod } from "../mod"
import { Value } from "../value"
import { freshen } from "../../ut/freshen"

export class FnValue extends Value {
  constructor(
    public mod: Mod,
    public env: Env,
    public name: string,
    public ret: Exp
  ) {
    super()
  }

  apply(arg: Value): Value {
    return this.ret.evaluate(this.mod, this.env.extend(this.name, arg))
  }

  readback(used: Set<string>): Exp {
    const freshName = freshen(used, this.name)
    const variable = new Exps.NotYetValue(new Exps.VarNeutral(freshName))
    const ret = Exps.Ap.apply(this, variable)
    return new Exps.Fn(freshName, ret.readback(new Set([...used, freshName])))
  }

  format(): string {
    return `(lambda (${this.name}) ${this.ret.format()})`
  }
}
