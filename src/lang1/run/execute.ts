import { formatExp } from "../format/formatExp.js"
import { modDefine, type Mod } from "../mod/index.js"
import { reduce } from "../reduce/reduce.js"
import { type Stmt } from "../stmt/Stmt.js"
import { importOne } from "./importOne.js"

export function execute(mod: Mod, stmt: Stmt): null | string {
  switch (stmt["@kind"]) {
    case "Compute": {
      const reducedExp = reduce(mod, stmt.exp)
      return formatExp(reducedExp)
    }

    case "Define": {
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
  }
}
