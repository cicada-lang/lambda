import type { Exp } from "../exp"

export function freeNames(boundNames: Set<string>, exp: Exp): Set<string> {
  switch (exp["@kind"]) {
    case "Var": {
      return boundNames.has(exp.name) ? new Set() : new Set([exp.name])
    }

    case "Fn": {
      return freeNames(new Set([...boundNames, exp.name]), exp.ret)
    }

    case "Ap": {
      return new Set([
        ...freeNames(boundNames, exp.target),
        ...freeNames(boundNames, exp.arg),
      ])
    }

    case "Fixpoint": {
      return freeNames(new Set([...boundNames, exp.name]), exp.body)
    }
  }
}
