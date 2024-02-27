import { type Binding, type Exp } from "../exp/index.js"
import { freshen } from "../utils/freshen.js"
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
      const freshName = freshen(body.name)
      return {
        "@type": "Exp",
        "@kind": "Fn",
        name: freshName,
        ret: {
          "@type": "Exp",
          "@kind": "Let",
          bindings: [
            ...bindings,
            {
              name: body.name,
              exp: {
                "@type": "Exp",
                "@kind": "Var",
                name: freshName,
              },
            },
          ],
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
      return substitute(body.body, [
        ...bindings,
        ...body.bindings.map(({ name, exp }) => ({
          name,
          exp: substitute(exp, bindings),
        })),
      ])
    }
  }
}
