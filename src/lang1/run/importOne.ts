import { modDefine, modFind, modResolve } from "../mod/index.js"
import type { Mod } from "../mod/Mod.js"
import type { ImportEntry } from "../stmt/Stmt.js"
import { executeMod } from "./executeMod.js"

export function importOne(mod: Mod, path: string, entry: ImportEntry): void {
  const url = modResolve(mod, path)
  if (url.href === mod.url.href) {
    throw new Error(`I can not circular import: ${path}`)
  }

  const found = mod.loadedMods.get(url.href)
  if (found === undefined) {
    throw new Error(`Mod is not loaded: ${path}`)
  }

  executeMod(found.mod)

  const { name, rename } = entry

  const def = modFind(found.mod, name)
  if (def === undefined) {
    throw new Error(
      `I can not import undefined name: ${name}, from path: ${path}`,
    )
  }

  modDefine(mod, rename || name, def)
}
