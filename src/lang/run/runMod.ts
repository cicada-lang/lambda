import { modOwnDefinitions, type Mod } from "../mod/index.ts"
import { assertAllNamesDefined } from "./assertAllNamesDefined.ts"
import { define } from "./define.ts"
import { execute } from "./execute.ts"
import { occurCheck } from "./occurCheck.ts"

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
