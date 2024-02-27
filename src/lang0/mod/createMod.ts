import { type Loader } from "../loader/index.js"
import { type Mod } from "./Mod.js"

export function createMod(options: { url: URL; loader: Loader }): Mod {
  const { url, loader } = options

  return {
    url,
    loader,
    definitions: new Map(),
    outputs: new Map(),
    stmts: [],
  }
}
