import { EqualCtx } from "../equal"
import * as Exps from "../exps"
import { Value } from "../value"

export function equal(ctx: EqualCtx, left: Value, right: Value): boolean {
  if (left instanceof Exps.LazyValue) {
    return equal(ctx, left.active(), right)
  }

  if (right instanceof Exps.LazyValue) {
    return equal(ctx, left, right.active())
  }

  if (left instanceof Exps.FixpointValue) {
    return equal(ctx, left.active(), right)
  }

  if (right instanceof Exps.FixpointValue) {
    return equal(ctx, left, right.active())
  }

  return left.equal(ctx, right)
}
