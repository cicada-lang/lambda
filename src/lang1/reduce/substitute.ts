import { type Binding, type Exp } from "../exp/index.js"

export function substitute(body: Exp, bindings: Array<Binding>): Exp {
  switch (body["@kind"]) {
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
