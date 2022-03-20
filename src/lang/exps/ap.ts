import { Env } from "../env"
import { LangError } from "../errors"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Mod } from "../mod"
import { Value } from "../value"

export class Ap extends Exp {
  constructor(public target: Exp, public arg: Exp) {
    super()
  }

  evaluate(mod: Mod, env: Env): Value {
    return Ap.apply(this.target.evaluate(mod, env), this.arg.evaluate(mod, env))
  }

  format(): string {
    return `(${this.target.format()} ${this.arg.format()})`
  }

  static apply(target: Value, arg: Value): Value {
    if (target instanceof Exps.NotYetValue) {
      return new Exps.NotYetValue(new Exps.ApNeutral(target.neutral, arg))
    }

    if (target instanceof Exps.FnValue) {
      return target.apply(arg)
    }

    throw new LangError(
      `I expect the target to be a function, instead of ${target.constructor.name}`
    )
  }
}
