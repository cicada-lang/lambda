import { execute } from "../execute/execute.js"
import type { Stmt } from "../stmt/Stmt.js"
import type { Mod } from "./Mod.js"

export async function modExecuteStmts(
  mod: Mod,
  stmts: Array<Stmt>,
): Promise<void> {
  for (const stmt of stmts) {
    const output = await execute(mod, stmt)
    mod.stmts.push(stmt)
    if (output) console.log(output)
  }
}
