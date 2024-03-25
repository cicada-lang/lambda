import { modExecuteStmts } from "../mod/modExecuteStmts.js"
import { load } from "./load.js"

export async function run(url: URL): Promise<void> {
  const mod = await load(url, new Map())
  modExecuteStmts(mod, mod.stmts)
}
