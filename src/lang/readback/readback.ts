import * as Actions from "../actions"
import type { Exp } from "../exp"
import * as Exps from "../exp"
import * as Neutrals from "../neutral"
import type { ReadbackCtx } from "../readback"
import { readbackNeutral } from "../readback"
import { freshen } from "../utils/freshen"
import type { Value } from "../value"
import * as Values from "../value"

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
      return Exps.Fn(freshName, readback(ctx, ret))
    }

    case "Fixpoint": {
      return Exps.Fixpoint(value.name, value.body)
    }

    case "Lazy": {
      return readback(ctx, Values.lazyActive(value))
    }
  }
}
