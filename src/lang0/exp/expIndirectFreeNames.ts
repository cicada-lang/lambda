import type { Mod } from "../mod/Mod.js"
import { modOwnDefinitions } from "../mod/modOwnDefinitions.js"
import type { Exp } from "./Exp.js"
import { expFreeNames } from "./expFreeNames.js"

export function expIndirectFreeNames(mod: Mod, exp: Exp): Set<string> {
  const freeNames = expFreeNames(new Set(), exp)
  const ownDefinitions = modOwnDefinitions(mod)

  const remainingNames = freeNames
  const indirectFreeNames = new Set<string>()

  while (remainingNames.size > 0) {
    //
  }

  return indirectFreeNames
}
