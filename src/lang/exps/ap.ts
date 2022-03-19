import { Env } from "../env"
import { LangError } from "../errors"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Span } from "../span"
import { Value } from "../value"

export class Ap extends Exp {
  constructor(public target: Exp, public arg: Exp, public span: Span) {
    super()
  }

  evaluate(env: Env): Value {
    const target = this.target.evaluate(env)
    if (target instanceof Exps.FnValue) {
      return target.apply(this.arg.evaluate(env))
    }

    throw new LangError(
      `I expect the target to be a function, instead of ${target.constructor.name}`,
      this.span
    )
  }
}
