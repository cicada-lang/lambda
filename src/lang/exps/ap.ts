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
    if (left instanceof Exps.LazyValue) {
      return Ap.equalApply(ctx, left.active(), right, arg)
    }

    if (right instanceof Exps.LazyValue) {
      return Ap.equalApply(ctx, left, right.active(), arg)
    }

    if (left instanceof Exps.NotYetValue && right instanceof Exps.NotYetValue) {
      return left.equal(ctx, right)
    }

    if (left instanceof Exps.FnValue && right instanceof Exps.FnValue) {
      ctx = ctx.parentPair(left, right)

      const leftValue = left.ret.evaluate(
        left.mod,
        left.env.extend(left.name, arg)
      )

      const rightValue = right.ret.evaluate(
        right.mod,
        right.env.extend(right.name, arg)
      )

      return leftValue.equal(ctx, rightValue)
    }

    return false
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
