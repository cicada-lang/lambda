import { equivalent, EquivalentCtx } from "../equivalent/index.js"
import { type Neutral } from "../neutral/index.js"

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

    case "ApRecursive": {
      return (
        right["@kind"] === "ApRecursive" &&
        equivalent(ctx, left.fn, right.fn) &&
        equivalentNeutral(ctx, left.arg, right.arg)
      )
    }
  }
}
