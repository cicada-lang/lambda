import { type Loader } from "../loader/index.js"
import { type Mod } from "./Mod.js"

export function createMod(options: {
  url: URL
  loader: Loader
  loadedMods: Map<string, { mod: Mod; text: string }>
}): Mod {
  const { url, loader, loadedMods } = options

  return {
    url,
    loader,
    loadedMods,
    definitions: new Map(),
    stmts: [],
  }
}
