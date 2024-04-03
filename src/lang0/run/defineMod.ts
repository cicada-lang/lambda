import type { Mod } from "../mod/index.js"
import { define } from "./define.js"

export function defineMod(mod: Mod): boolean {
  if (mod.isDefined) {
    return false
  }

  for (const stmt of mod.stmts) {
    define(mod, stmt)
  }

  mod.isDefined = true
  return true
}
