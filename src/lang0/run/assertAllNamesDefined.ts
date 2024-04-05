import * as Exps from "../exp/index.js"
import { formatExp } from "../format/formatExp.js"
import { modFind, type Mod } from "../mod/index.js"
import type { Define } from "../stmt/Stmt.js"

export function assertAllNamesDefined(mod: Mod, stmt: Define): void {
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
