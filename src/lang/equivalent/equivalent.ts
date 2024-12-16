import * as Actions from "../actions/index.ts"
import { EquivalentCtx, equivalentNeutral } from "../equivalent/index.ts"
import * as Neutrals from "../neutral/index.ts"
import { freshen } from "../utils/freshen.ts"
import * as Values from "../value/index.ts"
import { type Value } from "../value/index.ts"

export function equivalent(
  ctx: EquivalentCtx,
  left: Value,
  right: Value,
): boolean {
  left = Values.lazyActiveDeep(left)
  right = Values.lazyActiveDeep(right)

  if (right["@kind"] === "FnRecursive" && left["@kind"] === "FnRecursive") {
    return left.name === right.name && left.mod === right.mod
  }

  switch (left["@kind"]) {
    case "NotYet": {
      return (
        right["@kind"] === "NotYet" &&
        equivalentNeutral(ctx, left.neutral, right.neutral)
      )
    }

    case "Fn":
    case "FnRecursive": {
      const freshName = freshen(ctx.usedNames, left.name)
      ctx = ctx.useName(freshName)
      const v = Neutrals.Var(freshName)
      const arg = Values.NotYet(v)
      return equivalent(ctx, Actions.doAp(left, arg), Actions.doAp(right, arg))
    }

    case "Lazy": {
      return equivalent(ctx, Values.lazyActive(left), right)
    }
  }
}
