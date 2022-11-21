import * as Actions from "../actions"
import type { Exp } from "../exp"
import * as Exps from "../exp"
import * as Neutrals from "../neutral"
import { freshen } from "../utils/freshen"
import * as Values from "../value"
import { ReadbackCtx, readbackNeutral, Value } from "../value"

export function readback(ctx: ReadbackCtx, value: Value): Exp {
  switch (value["@kind"]) {
    case "NotYet": {
      return readbackNeutral(ctx, value.neutral)
    }

    case "Fn": {
      const freshName = freshen(ctx.usedNames, value.name)
      ctx = ctx.useName(freshName)
      const arg = Values.NotYet(Neutrals.Var(freshName))
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
