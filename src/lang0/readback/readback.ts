import * as Actions from "../actions/index.js"
import * as Exps from "../exp/index.js"
import { type Exp } from "../exp/index.js"
import * as Neutrals from "../neutral/index.js"
import { readbackNeutral, type ReadbackCtx } from "../readback/index.js"
import { freshen } from "../utils/freshen.js"
import * as Values from "../value/index.js"
import { type Value } from "../value/index.js"

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
