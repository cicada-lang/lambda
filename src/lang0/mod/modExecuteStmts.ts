import { execute } from "../execute/execute.js"
import type { Stmt } from "../stmt/Stmt.js"
import type { Mod } from "./Mod.js"

export function modExecuteStmts(mod: Mod, stmts: Array<Stmt>): void {
  for (const stmt of stmts) {
    const output = execute(mod, stmt)
    if (output) console.log(output)
  }
}
