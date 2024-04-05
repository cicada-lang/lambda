import { envEmpty } from "../env/index.js"
import { evaluate } from "../evaluate/index.js"
import { formatExp } from "../format/formatExp.js"
import type { Mod } from "../mod/Mod.js"
import { readback, ReadbackCtx } from "../readback/index.js"
import type { Stmt } from "../stmt/Stmt.js"
import { assertEqual } from "./assertEqual.js"
import { assertNotEqual } from "./assertNotEqual.js"

export function execute(mod: Mod, stmt: Stmt): null | string {
  switch (stmt["@kind"]) {
    case "AssertEqual": {
      for (let i = 0; i < stmt.exps.length - 1; i++) {
        assertEqual(mod, stmt.exps[i], stmt.exps[i + 1])
      }

      return null
    }

    case "AssertNotEqual": {
      for (let i = 0; i < stmt.exps.length - 1; i++) {
        assertNotEqual(mod, stmt.exps[i], stmt.exps[i + 1])
      }

      return null
    }

    case "Compute": {
      const value = evaluate(mod, envEmpty(), stmt.exp)
      const exp = readback(ReadbackCtx.init(), value)
      return formatExp(exp)
    }

    default: {
      return null
    }
  }
}
