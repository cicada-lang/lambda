import { type Binding, type Exp } from "../exp/index.js"

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
      throw new Error("TODO")
    }
  }
}

function doAp(target: Exp, arg: Exp): Exp {
  switch (target["@kind"]) {
    case "Fn": {
      return reduce({
        "@type": "Exp",
        "@kind": "Let",
        bindings: [
          {
            name: target.name,
            exp: arg,
          },
        ],
        body: target.ret,
      })
    }

    default: {
      return {
        "@type": "Exp",
        "@kind": "Ap",
        target,
        arg,
      }
    }
  }
}

function substitute(exp: Exp, bindings: Array<Binding>): Exp {
  return exp
}
