import { evaluateDefinition } from "../evaluate/evaluateDefinition.js"
import type { Value } from "../value/Value.js"
import type { Mod } from "./Mod.js"
import { modFind } from "./modFind.js"

export function modFindValue(mod: Mod, name: string): Value | undefined {
  const definition = modFind(mod, name)
  if (definition === undefined) return undefined
  return evaluateDefinition(definition)
}
