import { Fetcher } from "@cicada-lang/framework/lib/fetcher/index.js"
import * as Errors from "../errors/index.js"
import { createMod, modExecuteStmts, type Mod } from "../mod/index.js"
import { type Stmt } from "../stmt/index.js"
import { Parser } from "../syntax/index.js"

export async function run(url: URL): Promise<void> {
  const mod = load(url, new Map())
}

type ModStore = Map<string, { mod: Mod; text: string }>

async function load(url: URL, modStore: ModStore): Promise<Mod> {
  const found = modStore.get(url.href)
  if (found !== undefined) {
    return found.mod
  }

  const fetcher = new Fetcher()
  const text = await fetcher.fetch(url)

  try {
    const mod = createMod({ url })
    const stmts = parseStmts(text)
    await modExecuteStmts(mod, stmts)
    modStore.set(url.href, { mod, text })
    return mod
  } catch (error) {
    if (error instanceof Errors.ParsingError) {
      throw new Errors.ErrorReport(error.report(text))
    }

    throw error
  }
}

function parseStmts(text: string): Array<Stmt> {
  const parser = new Parser()
  return parser.parseStmts(text)
}
