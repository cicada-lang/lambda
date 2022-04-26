import { EqualCtx } from "../equal"
import { Value } from "../value"

export function equal(ctx: EqualCtx, left: Value, right: Value): boolean {
  if (left.preEqual !== undefined) {
    return equal(ctx, left.preEqual(), right)
  }

  if (right.preEqual !== undefined) {
    return equal(ctx, left, right.preEqual())
  }

  return left.equal(ctx, right)
}
