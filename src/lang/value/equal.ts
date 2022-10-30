import { EqualCtx, Value } from "../value"

export function equal(ctx: EqualCtx, left: Value, right: Value): boolean {
  if (left.preEqual !== undefined) {
    return equal(ctx, prepare(left), right)
  }

  if (right.preEqual !== undefined) {
    return equal(ctx, left, prepare(right))
  }

  return left.equal(ctx, right)
}

function prepare(value: Value): Value {
  return value.preEqual === undefined ? value : value.preEqual()
}
