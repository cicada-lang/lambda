import { expFreeNames } from "../exp/expFreeNames.js"
import { modDefine } from "../mod/index.js"
import type { Mod } from "../mod/Mod.js"
import type { Stmt } from "../stmt/Stmt.js"
import { importOne } from "./importOne.js"

export function define(mod: Mod, stmt: Stmt): null {
  switch (stmt["@kind"]) {
    case "Define": {
      modDefine(mod, stmt.name, {
        mod,
        name: stmt.name,
        exp: stmt.exp,
        freeNames: expFreeNames(new Set(), stmt.exp),
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
