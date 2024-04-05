import { substitutionBindings } from "../substitution/index.js"
import { type Exp } from "./index.js"

export function expFreeNames(boundNames: Set<string>, exp: Exp): Set<string> {
  switch (exp["@kind"]) {
    case "Var": {
      return boundNames.has(exp.name) ? new Set() : new Set([exp.name])
    }

    case "Fn": {
      return expFreeNames(new Set([...boundNames, exp.name]), exp.ret)
    }

    case "FnRecursive": {
      return expFreeNames(new Set([...boundNames, exp.name]), exp.ret)
    }

    case "Ap": {
      return new Set([
        ...expFreeNames(boundNames, exp.target),
        ...expFreeNames(boundNames, exp.arg),
      ])
    }

    case "Let": {
      // NOTE All bindings in the substitution are independent.
      const bindings = substitutionBindings(exp.substitution)
      const substitutionFreeNames = bindings
        .map((binding) => Array.from(expFreeNames(boundNames, binding.exp)))
        .flatMap((names) => names)
      return new Set([
        ...substitutionFreeNames,
        ...expFreeNames(
          new Set([...boundNames, ...bindings.map((binding) => binding.name)]),
          exp.body,
        ),
      ])
    }
  }
}
