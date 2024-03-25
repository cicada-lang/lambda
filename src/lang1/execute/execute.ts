import { formatExp } from "../format/formatExp.js"
import { modDefine, type Mod } from "../mod/index.js"
import { reduce } from "../reduce/reduce.js"
import { type Stmt } from "../stmt/Stmt.js"

export function execute(mod: Mod, stmt: Stmt): void | string {
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
    }
  }
}
