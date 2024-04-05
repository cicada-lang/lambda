import { type Mod } from "../mod/index.js"
import { assertAllNamesDefined } from "./assertAllNamesDefined.js"
import { define } from "./define.js"
import { execute } from "./execute.js"

export function runMod(mod: Mod): void {
  if (mod.isFinished) return

  for (const stmt of mod.stmts) define(mod, stmt)

  for (const stmt of mod.stmts)
    if (stmt["@kind"] === "Define") assertAllNamesDefined(mod, stmt)

  for (const stmt of mod.stmts) {
    const output = execute(mod, stmt)
    if (output) console.log(output)
  }

  mod.isFinished = true
}
