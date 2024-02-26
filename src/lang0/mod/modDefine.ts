import type { Definition } from "../definition/Definition.js"
import { LangError } from "../errors/LangError.js"
import type { Mod } from "./Mod.js"

export function modDefine(
  mod: Mod,
  name: string,
  definition: Definition,
): void {
  assertNotRedefine(mod, name)
  mod.definitions.set(name, definition)
}

function assertNotRedefine(mod: Mod, name: string): void {
  if (mod.find(name)) {
    throw new LangError(`I can not redefine name: ${name}`)
  }
}
