import { type Mod } from "../mod/index.js"
import { defineMod } from "./defineMod.js"
import { executeMod } from "./executeMod.js"

export function runMod(mod: Mod): void {
  defineMod(mod)
  executeMod(mod)
}
