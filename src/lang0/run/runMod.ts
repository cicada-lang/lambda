import * as Exps from "../exp/index.js"
import { formatExp } from "../format/formatExp.js"
import { modFind, type Mod } from "../mod/index.js"
import type { Define } from "../stmt/Stmt.js"
import { define } from "./define.js"
import { execute } from "./execute.js"

export function runMod(mod: Mod): void {
  if (mod.isFinished) {
    return
  }

  for (const stmt of mod.stmts) {
    define(mod, stmt)
  }

  for (const stmt of mod.stmts) {
    if (stmt["@kind"] === "Define") {
      assertAllNamesDefined(mod, stmt)
    }
  }

  for (const stmt of mod.stmts) {
    const output = execute(mod, stmt)
    if (output) console.log(output)
  }

  mod.isFinished = true
}

function assertAllNamesDefined(mod: Mod, stmt: Define): void {
  const freeNames = Exps.freeNames(new Set([stmt.name]), stmt.exp)

  for (const name of freeNames) {
    if (modFind(mod, name) === undefined) {
      throw new Error(
        [
          `I find undefined name: ${name}`,
          `  defining: ${stmt.name}`,
          `  body: ${formatExp(stmt.exp)}`,
        ].join("\n"),
      )
    }
  }
}
