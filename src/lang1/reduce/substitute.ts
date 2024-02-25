import { type Binding, type Exp } from "../exp/index.js"
import { lookup } from "./lookup.js"

export function substitute(body: Exp, bindings: Array<Binding>): Exp {
  switch (body["@kind"]) {
    case "Var": {
      const found = lookup(body.name, bindings)
      if (found) {
        return found
      } else {
        return body
      }
    }

    case "Fn": {
      throw new Error("TODO")
    }

    case "Ap": {
      return {
        "@type": "Exp",
        "@kind": "Ap",
        target: {
          "@type": "Exp",
          "@kind": "Let",
          bindings,
          body: body.target,
        },
        arg: {
          "@type": "Exp",
          "@kind": "Let",
          bindings,
          body: body.arg,
        },
      }
    }

    case "Let": {
      throw new Error("TODO")
    }
  }
}
