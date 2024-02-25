import { type Exp } from "../exp/index.js"
import { reduce } from "./reduce.js"

export function doAp(target: Exp, arg: Exp): Exp {
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
