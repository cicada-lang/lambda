import type { Mod } from "./Mod.js"

export function modUndefine(mod: Mod, name: string): void {
  mod.definitions.delete(name)
}
