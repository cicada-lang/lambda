import type { Stmt } from "../stmt/Stmt.js"
import type { Mod } from "./Mod.js"

export async function modExecuteStmts(
  mod: Mod,
  stmts: Array<Stmt>,
): Promise<void> {
  const offset = mod.stmts.length
  for (const [index, stmt] of stmts.entries()) {
    const output = await stmt.execute(mod)
    mod.stmts.push(stmt)
    if (output) {
      mod.outputs.set(offset + index, output)
      if (mod.loader.options.onOutput) {
        mod.loader.options.onOutput(output)
      }
    }
  }
}
