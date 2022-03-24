import { EqualCtx, equalEvaluate } from "../equal"
import * as Exps from "../exps"
import { Value } from "../value"

export function equalApply(
  ctx: EqualCtx,
  left: { target: Value; arg: Value },
  right: { target: Value; arg: Value }
): boolean {
  if (left.target instanceof Exps.LazyValue) {
    return equalApply(
      ctx,
      { target: left.target.active(), arg: left.arg },
      right
    )
  }

  if (right.target instanceof Exps.LazyValue) {
    return equalApply(ctx, left, {
      target: right.target.active(),
      arg: right.arg,
    })
  }

  if (
    left.target instanceof Exps.NotYetValue &&
    right.target instanceof Exps.NotYetValue
  ) {
    return (
      left.target.equal(ctx, right.target) && left.arg.equal(ctx, right.arg)
    )
  }

  if (
    left.target instanceof Exps.FnValue &&
    right.target instanceof Exps.FnValue
  ) {
    return equalEvaluate(
      ctx.parentPair(left.target, right.target),
      {
        mod: left.target.mod,
        env: left.target.env.extend(left.target.name, left.arg),
        exp: left.target.ret,
      },
      {
        mod: right.target.mod,
        env: right.target.env.extend(right.target.name, right.arg),
        exp: right.target.ret,
      }
    )
  }

  return false
}
