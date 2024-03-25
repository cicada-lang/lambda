import type { Mod } from "../mod/index.js"
import { execute } from "./execute.js"

export function executeMod(mod: Mod): boolean {
  if (mod.isExecuted) {
    return false
  }

  for (const stmt of mod.stmts) {
    const output = execute(mod, stmt)
    if (output) {
      console.log(output)
    }
  }

  mod.isExecuted = true
  return true
}
