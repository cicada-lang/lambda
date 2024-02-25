import { type Exp } from "../exp/index.js"
import { doAp } from "./doAp.js"
import { substitute } from "./substitute.js"

// NOTE `reduce` might hit fixpoint on other kind of expressions,
// but it will always remove `Let`.

export function reduce(exp: Exp): Exp {
  switch (exp["@kind"]) {
    case "Var": {
      return exp
    }

    case "Fn": {
      return {
        "@type": "Exp",
        "@kind": "Fn",
        name: exp.name,
        ret: reduce(exp.ret),
      }
    }

    case "Ap": {
      // NOTE Reduce both the `target` and the `arg` first,
      // thus this strategy is call-by-value.
      return doAp(reduce(exp.target), reduce(exp.arg))
    }

    case "Let": {
      return reduce(substitute(exp.body, exp.bindings))
    }
  }
}
