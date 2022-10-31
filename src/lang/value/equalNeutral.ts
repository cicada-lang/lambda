import { Neutral } from "../neutral"
import * as Values from "../value"
import { equal, EqualCtx } from "../value"

export function equalNeutral(
  ctx: EqualCtx,
  left: Neutral,
  right: Neutral,
): boolean {
  switch (left.kind) {
    case "Var": {
      return right.kind === "Var" && right.name === left.name
    }

    case "Ap": {
      return (
        right.kind === "Ap" &&
        equalNeutral(ctx, left.target, right.target) &&
        equal(ctx, left.arg, right.arg)
      )
    }

    case "Fixpoint": {
      return (
        right.kind === "Fixpoint" &&
        Values.equal(
          ctx,
          Values.wrapper(left.fixpoint),
          Values.wrapper(right.fixpoint),
        )
      )
    }
  }
}
