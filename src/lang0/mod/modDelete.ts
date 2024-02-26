import type { Mod } from "./Mod.js"

export function modDelete(mod: Mod, name: string): void {
  mod.definitions.delete(name)
}
