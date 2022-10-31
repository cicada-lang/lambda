import * as Actions from "../actions"
import * as Exps from "../exp"
import { Exp } from "../exp"
import * as Neutrals from "../neutral"
import { freshen } from "../utils/freshen"
import * as Values from "../value"
import { ReadbackCtx, readbackNeutral, Value } from "../value"

export function readback(ctx: ReadbackCtx, value: Value): Exp {
  switch (value.kind) {
    case "NotYet": {
      return readbackNeutral(ctx, value.neutral)
    }

    case "Fn": {
      const freshName = freshen(ctx.usedNames, value.name)
      ctx = ctx.useName(freshName)
      const v = Neutrals.Var(freshName)
      const arg = Values.NotYet(v)
      const ret = Actions.doAp(value, arg)
      return Exps.Fn(freshName, Values.readback(ctx, ret))
    }

    case "Fixpoint": {
      return Exps.Fixpoint(value.name, value.body)
    }

    case "Lazy": {
      return Values.readback(ctx, Values.activeLazy(value))
    }
  }
}

export function eta(value: Values.Fixpoint): Value {
  return Exps.evaluate(
    value.mod,
    value.env.extend("f", Values.NotYet(Neutrals.Fixpoint(value))),
    Exps.Fn("x", Exps.Ap(Exps.Var("f"), Exps.Var("x"))),
  )
}

export function wrapper(value: Values.Fixpoint): Value {
  return Exps.evaluate(value.mod, value.env, Exps.Fn(value.name, value.body))
}
