import { setPop } from "../../utils/setPop.js"
import type { Mod } from "../mod/index.js"
import { modOwnDefinitions } from "../mod/modOwnDefinitions.js"
import type { Exp } from "./Exp.js"
import { expFreeNames } from "./expFreeNames.js"

export function expIndirectFreeNames(mod: Mod, exp: Exp): Set<string> {
  const ownDefinitions = modOwnDefinitions(mod)
  const remainingNames = expFreeNames(new Set(), exp)
  const collectedNames = new Set<string>()

  while (remainingNames.size > 0) {
    const name = setPop(remainingNames)
    if (collectedNames.has(name)) continue

    collectedNames.add(name)

    const definition = ownDefinitions.get(name)
    if (definition === undefined) continue

    for (const freeName of definition.freeNames) {
      if (!collectedNames.has(freeName)) {
        remainingNames.add(freeName)
      }
    }
  }

  return collectedNames
}
