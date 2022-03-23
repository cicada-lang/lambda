import { Env } from "../env"
import { EqualCtx } from "../equal"
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
    const target = this.target.evaluate(mod, env)
    const arg = new Exps.LazyValue(mod, env, this.arg)
    return Ap.apply(target, arg)
  }

  format(): string {
    const { target, args } = formatAp(this.target, [this.arg.format()])
    return `(${target} ${args.join(" ")})`
  }

  static equalApply(
    ctx: EqualCtx,
    left: Value,
    right: Value,
    arg: Value
  ): boolean {
    const ret = Exps.Ap.apply(left, arg)
    const thatRet = Exps.Ap.apply(right, arg)
    return ret.equal(ctx, thatRet)
  }

  static apply(target: Value, arg: Value): Value {
    if (target instanceof Exps.LazyValue) {
      return Ap.apply(target.active(), arg)
    }

    if (target instanceof Exps.NotYetValue) {
      return new Exps.NotYetValue(new Exps.ApNeutral(target.neutral, arg))
    }

    if (target instanceof Exps.FnValue) {
      return target.ret.evaluate(
        target.mod,
        target.env.extend(target.name, arg)
      )
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
