import * as Actions from "../actions"
import * as Neutrals from "../neutral"
import { freshen } from "../utils/freshen"
import * as Values from "../value"
import { EquivalentCtx, equivalentNeutral, Value } from "../value"

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
      return equivalent(ctx, left, right)
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
