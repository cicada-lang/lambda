import { envExtend } from "../env/Env.js"
import { evaluate } from "../evaluate/index.js"
import * as Neutrals from "../neutral/index.js"
import * as Values from "../value/index.js"
import { type Value } from "../value/index.js"

export function doAp(target: Value, arg: Value): Value {
  switch (target["@kind"]) {
    case "Fn": {
      return evaluate(
        target.mod,
        envExtend(target.env, target.name, arg),
        target.ret,
      )
    }

    case "FnRecursive": {
      arg = Values.lazyActiveDeep(arg)

      if (arg["@kind"] === "NotYet") {
        return Values.NotYet(Neutrals.ApRecursive(target, arg.neutral))
      }

      return evaluate(
        target.mod,
        envExtend(target.env, target.name, arg),
        target.ret,
      )
    }

    case "Lazy": {
      return doAp(Values.lazyActive(target), arg)
    }

    case "NotYet": {
      return Values.NotYet(Neutrals.Ap(target.neutral, arg))
    }
  }
}
