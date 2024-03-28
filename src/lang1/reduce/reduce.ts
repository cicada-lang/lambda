import * as Exps from "../exp/index.js"
import { type Exp } from "../exp/index.js"
import { modFind, type Mod } from "../mod/index.js"
import { substitutionInitial } from "../substitution/index.js"
import { substitute } from "./substitute.js"

// NOTE `reduce` might hit fixpoint on other kind of expressions,
// but it will always remove `Let`.

export function reduce(mod: Mod, exp: Exp): Exp {
  switch (exp["@kind"]) {
    case "Var": {
      const defintion = modFind(mod, exp.name)
      if (defintion) {
        return reduce(mod, defintion.exp)
      } else {
        return exp
      }
    }

    case "Lazy": {
      if (exp.cache) {
        return exp.cache
      } else {
        exp.cache = reduce(mod, exp.exp)
        return exp.cache
      }
    }

    case "Fn": {
      return Exps.Fn(exp.name, reduce(mod, exp.ret))
    }

    case "Ap": {
      const target = reduce(mod, exp.target)
      const arg = Exps.Lazy(exp.arg)

      switch (target["@kind"]) {
        case "Fn": {
          const substitution = substitutionInitial(target.name, arg)
          return reduce(mod, substitute(substitution, target.ret))
        }

        default: {
          return Exps.Ap(target, reduce(mod, arg))
        }
      }
    }

    case "Let": {
      return reduce(mod, substitute(exp.substitution, exp.body))
    }
  }
}
