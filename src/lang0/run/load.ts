import { Fetcher } from "@cicada-lang/framework/lib/fetcher/index.js"
import fs from "node:fs"
import { ParsingError } from "../../sexp/index.js"
import { createMod, modResolve, type Mod } from "../mod/index.js"
import { type Stmt } from "../stmt/index.js"
import { Parser } from "../syntax/index.js"

const fetcher = new Fetcher()

fetcher.register("file", (url) => fs.promises.readFile(url.pathname, "utf8"))

export async function load(
  url: URL,
  loadedMods: Map<string, { mod: Mod; text: string }>,
): Promise<Mod> {
  const found = loadedMods.get(url.href)
  if (found !== undefined) {
    return found.mod
  }

  const text = await fetcher.fetch(url)

  try {
    const mod = createMod({ url, loadedMods })
    mod.stmts = parseStmts(text)
    loadedMods.set(url.href, { mod, text })

    for (const stmt of mod.stmts) {
      if (stmt["@kind"] === "Import") {
        const importedUrl = modResolve(mod, stmt.path)
        await load(importedUrl, loadedMods)
      }
    }

    return mod
  } catch (error) {
    if (error instanceof ParsingError) {
      throw new Error(error.report(text))
    }

    throw error
  }
}

function parseStmts(text: string): Array<Stmt> {
  const parser = new Parser()
  return parser.parseStmts(text)
}
