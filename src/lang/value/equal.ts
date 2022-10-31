import * as Actions from "../actions"
import * as Exps from "../exp"
import * as Neutrals from "../neutral"
import { freshen } from "../utils/freshen"
import * as Values from "../value"
import { EqualCtx, equalNeutral, Value } from "../value"

export function equal(ctx: EqualCtx, left: Value, right: Value): boolean {
  left = prepare(left)
  right = prepare(right)

  switch (left.kind) {
    case "NotYet": {
      return (
        right.kind === "NotYet" &&
        equalNeutral(ctx, left.neutral, right.neutral)
      )
    }

    case "Fn": {
      const freshName = freshen(ctx.usedNames, left.name)
      ctx = ctx.useName(freshName)
      const v = Neutrals.Var(freshName)
      const arg = Values.NotYet(v)
      return equal(ctx, Actions.doAp(left, arg), Actions.doAp(right, arg))
    }

    case "Fixpoint": {
      return equal(ctx, left, right)
    }

    case "Lazy": {
      return equal(ctx, activeLazy(left), right)
    }
  }
}

function prepare(value: Value): Value {
  if (value.kind === "Fixpoint") {
    return prepare(Values.eta(value))
  }

  if (value.kind === "Lazy") {
    return prepare(activeLazy(value))
  }

  return value
}

export function activeLazy(lazy: Values.Lazy): Value {
  if (lazy.cache !== undefined) {
    return lazy.cache
  }

  const value = Exps.evaluate(lazy.mod, lazy.env, lazy.exp)
  lazy.cache = value
  return value
}
