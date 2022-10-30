import * as Values from "../value"
import { EqualCtx, Value } from "../value"

export function equal(ctx: EqualCtx, left: Value, right: Value): boolean {
  left = prepare(left)
  right = prepare(right)

  return left.equal(ctx, right)
}

function prepare(value: Value): Value {
  if (value instanceof Values.Fixpoint) {
    return prepare(value.eta())
  }

  if (value instanceof Values.Lazy) {
    return prepare(value.active())
  }

  return value
}
