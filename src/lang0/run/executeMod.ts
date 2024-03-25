import type { Mod } from "../mod/index.js"
import { execute } from "./execute.js"

export function executeMod(mod: Mod): void {
  for (const stmt of mod.stmts) {
    const output = execute(mod, stmt)
    if (output) console.log(output)
  }
}
