import * as Exps from "../exp/index.js"
import { type Exp } from "../exp/index.js"
import type { Mod } from "../mod/Mod.js"
import { substitutionInitial } from "../substitution/index.js"
import { reduce } from "./reduce.js"

export function doAp(mod: Mod, target: Exp, arg: Exp): Exp {
  switch (target["@kind"]) {
    case "Fn": {
      const substitution = substitutionInitial(target.name, arg)
      return reduce(mod, Exps.Let(substitution, target.ret))
    }

    default: {
      return Exps.Ap(target, arg)
    }
  }
}
