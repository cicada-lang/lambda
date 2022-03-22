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

  freeNames(boundNames: Set<string>): Set<string> {
    return new Set([
      ...this.target.freeNames(boundNames),
      ...this.arg.freeNames(boundNames),
    ])
  }

  evaluate(mod: Mod, env: Env): Value {
    return Ap.apply(
      this.target.evaluate(mod, env),
      new Exps.LazyValue(mod, env, this.arg)
    )
  }

  format(): string {
    const { target, args } = formatAp(this.target, [this.arg.format()])
    return `(${target} ${args.join(" ")})`
  }

  static apply(target: Value, arg: Value): Value {
    if (target instanceof Exps.LazyValue) {
      return Ap.apply(target.active(), arg)
    }

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

function formatAp(
  target: Exp,
  args: Array<string>
): { target: string; args: Array<string> } {
  if (target instanceof Ap) {
    return formatAp(target.target, [target.arg.format(), ...args])
  } else {
    return { target: target.format(), args }
  }
}
