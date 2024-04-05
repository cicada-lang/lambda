import type { Definition } from "../definition/Definition.js"
import type { Mod } from "./Mod.js"

export function modOwnDefinitions(mod: Mod): Map<string, Definition> {
  const ownDefinitions = new Map()
  for (const [name, definition] of mod.definitions) {
    if (definition.mod.url.href === mod.url.href) {
      ownDefinitions.set(name, definition)
    }
  }

  return ownDefinitions
}
