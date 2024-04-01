import { type Exp } from "../exp/index.js"
import { substitutionBindings } from "../substitution/index.js"

export function freeNames(boundNames: Set<string>, exp: Exp): Set<string> {
  switch (exp["@kind"]) {
    case "Var": {
      return boundNames.has(exp.name) ? new Set() : new Set([exp.name])
    }

    case "Fn": {
      return freeNames(new Set([...boundNames, exp.name]), exp.ret)
    }

    case "FnRec": {
      return freeNames(new Set([...boundNames, exp.name]), exp.ret)
    }

    case "Ap": {
      return new Set([
        ...freeNames(boundNames, exp.target),
        ...freeNames(boundNames, exp.arg),
      ])
    }

    case "Let": {
      // NOTE All bindings in the substitution are independent.
      const bindings = substitutionBindings(exp.substitution)
      const substitutionFreeNames = bindings
        .map((binding) => Array.from(freeNames(boundNames, binding.exp)))
        .flatMap((names) => names)
      return new Set([
        ...substitutionFreeNames,
        ...freeNames(
          new Set([...boundNames, ...bindings.map((binding) => binding.name)]),
          exp.body,
        ),
      ])
    }
  }
}
