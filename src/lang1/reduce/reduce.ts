import { type Exp } from "../exp/index.js"
import { modFind, type Mod } from "../mod/index.js"
import { doAp } from "./doAp.js"
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

    case "Fn": {
      return {
        "@type": "Exp",
        "@kind": "Fn",
        name: exp.name,
        ret: reduce(mod, exp.ret),
      }
    }

    case "Ap": {
      return doAp(mod, reduce(mod, exp.target), reduce(mod, exp.arg))
    }

    case "Let": {
      return reduce(mod, substitute(exp.bindings, exp.body))
    }
  }
}
