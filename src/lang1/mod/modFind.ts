import type { Definition } from "../definition/Definition.js"
import type { Mod } from "./Mod.js"

export function modFind(mod: Mod, name: string): Definition | undefined {
  return mod.definitions.get(name)
}
