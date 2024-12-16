import type { Definition } from "../definition/Definition.ts"
import type { Mod } from "./Mod.ts"

export function modFind(mod: Mod, name: string): Definition | undefined {
  return mod.definitions.get(name)
}
