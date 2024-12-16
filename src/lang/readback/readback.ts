import * as Actions from "../actions/index.ts"
import * as Exps from "../exp/index.ts"
import { type Exp } from "../exp/index.ts"
import * as Neutrals from "../neutral/index.ts"
import { readbackNeutral, type ReadbackCtx } from "../readback/index.ts"
import { freshen } from "../utils/freshen.ts"
import * as Values from "../value/index.ts"
import { type Value } from "../value/index.ts"

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

    case "FnRecursive": {
      return Exps.Var(value.recursiveName)
    }

    case "Lazy": {
      return readback(ctx, Values.lazyActive(value))
    }
  }
}
