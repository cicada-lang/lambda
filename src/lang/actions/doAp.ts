import * as Exps from "../exp"
import * as Neutrals from "../neutral"
import * as Values from "../value"
import { Value } from "../value"

export function doAp(target: Value, arg: Value): Value {
  switch (target.kind) {
    case "Fn": {
      return Exps.evaluate(
        target.mod,
        target.env.extend(target.name, arg),
        target.ret,
      )
    }

    case "Lazy": {
      return doAp(Values.activeLazy(target), arg)
    }

    case "Fixpoint": {
      if (arg.kind === "Lazy") {
        return doAp(target, Values.activeLazy(arg))
      }

      if (arg.kind === "NotYet") {
        return doAp(Values.eta(target), arg)
      }

      const fix = Exps.evaluate(target.mod, target.env, Exps.Var("fix"))
      return doAp(doAp(fix, Values.wrapper(target)), arg)
    }

    case "NotYet": {
      return Values.NotYet(Neutrals.Ap(target.neutral, arg))
    }
  }
}
