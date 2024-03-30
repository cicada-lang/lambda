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
  left = prepare(left)
  right = prepare(right)

  switch (left["@kind"]) {
    case "NotYet": {
      return (
        right["@kind"] === "NotYet" &&
        equivalentNeutral(ctx, left.neutral, right.neutral)
      )
    }

    case "Fn": {
      const freshName = freshen(ctx.usedNames, left.name)
      ctx = ctx.useName(freshName)
      const v = Neutrals.Var(freshName)
      const arg = Values.NotYet(v)
      return equivalent(ctx, Actions.doAp(left, arg), Actions.doAp(right, arg))
    }

    case "Fixpoint": {
      throw new Error(`[equivalent] Not implemented for Fixpoint.`)
    }

    case "Lazy": {
      return equivalent(ctx, Values.lazyActive(left), right)
    }
  }
}

function prepare(value: Value): Value {
  if (value["@kind"] === "Fixpoint") {
    return prepare(Values.fixpointEta(value))
  }

  if (value["@kind"] === "Lazy") {
    return prepare(Values.lazyActive(value))
  }

  return value
}
