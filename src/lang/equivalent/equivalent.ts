import * as Actions from "../actions/index.js"
import { EquivalentCtx, equivalentNeutral } from "../equivalent/index.js"
import * as Neutrals from "../neutral/index.js"
import { freshen } from "../utils/freshen.js"
import * as Values from "../value/index.js"
import { type Value } from "../value/index.js"

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
