import type { Definition } from "../definition/Definition.js"
import type { Mod } from "./Mod.js"
import { modFind } from "./modFind.js"

export function modDefine(
  mod: Mod,
  name: string,
  definition: Definition,
): void {
  assertNotRedefine(mod, name)
  mod.definitions.set(name, definition)
}

function assertNotRedefine(mod: Mod, name: string): void {
  if (modFind(mod, name)) {
    throw new Error(`I can not redefine name: ${name}`)
  }
}
