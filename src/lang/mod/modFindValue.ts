import { evaluateDefinition } from "../evaluate/evaluateDefinition.ts"
import type { Value } from "../value/Value.ts"
import type { Mod } from "./Mod.ts"
import { modFind } from "./modFind.ts"

export function modFindValue(mod: Mod, name: string): Value | undefined {
  const definition = modFind(mod, name)
  if (definition === undefined) return undefined
  return evaluateDefinition(definition)
}
