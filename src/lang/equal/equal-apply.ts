import { EqualCtx } from "../equal"
import * as Exps from "../exps"
import { Value } from "../value"

export function equalApply(
  ctx: EqualCtx,
  left: Value,
  right: Value,
  arg: Value
): boolean {
  if (left instanceof Exps.LazyValue) {
    return equalApply(ctx, left.active(), right, arg)
  }

  if (right instanceof Exps.LazyValue) {
    return equalApply(ctx, left, right.active(), arg)
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
