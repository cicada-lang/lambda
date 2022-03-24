import { EqualCtx, equalEvaluate } from "../equal"
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
    return equalEvaluate(
      ctx.parentPair(left, right),
      {
        mod: left.mod,
        env: left.env.extend(left.name, arg),
        exp: left.ret,
      },
      {
        mod: right.mod,
        env: right.env.extend(right.name, arg),
        exp: right.ret,
      }
    )
  }

  return false
}
