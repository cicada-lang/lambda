import { modOwnDefinitions, type Mod } from "../mod/index.js"
import { assertAllNamesDefined } from "./assertAllNamesDefined.js"
import { define } from "./define.js"
import { execute } from "./execute.js"
import { occurCheck } from "./occurCheck.js"

export function runMod(mod: Mod): void {
  if (mod.isFinished) return

  for (const stmt of mod.stmts) define(mod, stmt)

  for (const definition of modOwnDefinitions(mod).values())
    assertAllNamesDefined(mod, definition)

  for (const definition of modOwnDefinitions(mod).values())
    occurCheck(mod, definition)

  for (const stmt of mod.stmts) {
    const output = execute(mod, stmt)
    if (output) console.log(output)
  }

  mod.isFinished = true
}
