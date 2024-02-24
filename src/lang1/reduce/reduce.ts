import { type Exp } from "../exp/index.js"

export function reduce(exp: Exp): Exp {
  switch (exp["@kind"]) {
    case "Var": {
      throw new Error("TODO")
    }

    case "Fn": {
      throw new Error("TODO")
    }

    case "Ap": {
      throw new Error("TODO")
    }

    case "Let": {
      throw new Error("TODO")
    }
  }
}
