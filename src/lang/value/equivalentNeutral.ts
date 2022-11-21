import type { Neutral } from "../neutral"
import * as Values from "../value"
import { equivalent, EquivalentCtx } from "../value"

export function equivalentNeutral(
  ctx: EquivalentCtx,
  left: Neutral,
  right: Neutral,
): boolean {
  switch (left["@kind"]) {
    case "Var": {
      return right["@kind"] === "Var" && right.name === left.name
    }

    case "Ap": {
      return (
        right["@kind"] === "Ap" &&
        equivalentNeutral(ctx, left.target, right.target) &&
        equivalent(ctx, left.arg, right.arg)
      )
    }

    case "Fixpoint": {
      return (
        right["@kind"] === "Fixpoint" &&
        Values.equivalent(
          ctx,
          Values.fixpointWrap(left.fixpoint),
          Values.fixpointWrap(right.fixpoint),
        )
      )
    }
  }
}
