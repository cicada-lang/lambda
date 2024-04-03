import * as Exps from "../exp/index.js"
import { formatExp } from "../format/formatExp.js"
import { modDefine, modFind } from "../mod/index.js"
import type { Mod } from "../mod/Mod.js"
import type { Define, Stmt } from "../stmt/Stmt.js"
import { importOne } from "./importOne.js"

export function define(mod: Mod, stmt: Stmt): null {
  switch (stmt["@kind"]) {
    case "Define": {
      assertAllNamesDefined(mod, stmt)

      modDefine(mod, stmt.name, {
        mod,
        name: stmt.name,
        exp: stmt.exp,
      })

      return null
    }

    case "Import": {
      for (const entry of stmt.entries) {
        importOne(mod, stmt.path, entry)
      }

      return null
    }

    default: {
      return null
    }
  }
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
