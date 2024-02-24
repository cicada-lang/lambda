import { type Exp } from "../exp/index.js"

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
      // thus call-by-value.
      return doAp(reduce(exp.target), reduce(exp.arg))
    }

    case "Let": {
      throw new Error("TODO")
    }
  }
}

function doAp(target: Exp, arg: Exp): Exp {
  switch (target['@kind']){
    case "Fn": {
      throw new Error("TODO")
    }

    default: {
      return {
        "@type": "Exp",
        "@kind": "Ap",
        target,
        arg
      }
    }
  }
}
