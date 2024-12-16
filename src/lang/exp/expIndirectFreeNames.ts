import { setPop } from "../../utils/setPop.ts"
import type { Mod } from "../mod/index.ts"
import { modOwnDefinitions } from "../mod/modOwnDefinitions.ts"
import type { Exp } from "./Exp.ts"
import { expFreeNames } from "./expFreeNames.ts"

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
