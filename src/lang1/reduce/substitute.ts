import { type Exp } from "../exp/index.js"
import {
  substitutionAppend,
  substitutionExtend,
  substitutionMapExp,
  type Substitution,
} from "../substitution/index.js"
import { freshen } from "../utils/freshen.js"
import { lookup } from "./lookup.js"

export function substitute(substitution: Substitution, body: Exp): Exp {
  switch (body["@kind"]) {
    case "Var": {
      const found = lookup(body.name, substitution)
      if (found) {
        return found
      } else {
        return body
      }
    }

    case "Fn": {
      const freshName = freshen(body.name)
      return {
        "@type": "Exp",
        "@kind": "Fn",
        name: freshName,
        ret: {
          "@type": "Exp",
          "@kind": "Let",
          substitution: substitutionExtend(substitution, body.name, {
            "@type": "Exp",
            "@kind": "Var",
            name: freshName,
          }),
          body: body.ret,
        },
      }
    }

    case "Ap": {
      return {
        "@type": "Exp",
        "@kind": "Ap",
        target: {
          "@type": "Exp",
          "@kind": "Let",
          substitution: substitution,
          body: body.target,
        },
        arg: {
          "@type": "Exp",
          "@kind": "Let",
          substitution: substitution,
          body: body.arg,
        },
      }
    }

    case "Let": {
      return substitute(
        substitutionAppend(
          substitution,
          substitutionMapExp(body.substitution, (exp) =>
            substitute(substitution, exp),
          ),
        ),
        body.body,
      )
    }
  }
}
