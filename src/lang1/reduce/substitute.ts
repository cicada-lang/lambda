import * as Exps from "../exp/index.js"
import { type Exp } from "../exp/index.js"
import {
  substitutionExtend,
  substitutionIsEmpty,
  substitutionMapExp,
  substitutionMerge,
  substitutionTakeNames,
  type Substitution,
} from "../substitution/index.js"
import { globalFreshen } from "../utils/globalFreshen.js"
import { lookup } from "./lookup.js"

// NOTE `substitute` should not call `reduce.

export function substitute(substitution: Substitution, body: Exp): Exp {
  substitution = substitutionTakeNames(
    substitution,
    Exps.expFreeNames(new Set(), body),
  )

  if (substitutionIsEmpty(substitution)) {
    return body
  }

  switch (body["@kind"]) {
    case "Var": {
      const found = lookup(body.name, substitution)
      if (found) {
        return found
      } else {
        return body
      }
    }

    case "Lazy": {
      if (body.cache) {
        return substitute(substitution, body.cache)
      } else {
        return Exps.Lazy(substitute(substitution, body.exp))
      }
    }

    case "Fn": {
      const freshName = globalFreshen(body.name)
      return Exps.Fn(
        freshName,
        Exps.Let(
          substitutionExtend(substitution, body.name, Exps.Var(freshName)),
          body.ret,
        ),
      )
    }

    case "Ap": {
      return Exps.Ap(
        Exps.Let(substitution, body.target),
        Exps.Let(substitution, body.arg),
      )
    }

    case "Let": {
      return substitute(
        composeSubstitution(substitution, body.substitution),
        body.body,
      )
    }
  }
}

export function composeSubstitution(
  left: Substitution,
  right: Substitution,
): Substitution {
  return substitutionMerge(
    left,
    substitutionMapExp(right, (exp) => substitute(left, exp)),
  )
}
