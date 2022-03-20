import { ParsingError } from "@cicada-lang/sexp/lib/errors"
import fs from "fs"
import { Mod } from "../../mod"
import { Parser } from "../../parser"

export class FileModLoader {
  async load(url: URL): Promise<Mod> {
    const mod = new Mod(url)
    mod.loaders.set("file:", this)

    const text = await fs.promises.readFile(url.pathname, "utf8")
    const parser = new Parser()

    try {
      const stmts = parser.parseStmts(text)
      for (const stmt of stmts) {
        stmt.execute(mod)
      }

      return mod
    } catch (error) {
      if (error instanceof ParsingError) {
        const report = error.span.report(text)
        console.error(report)
      }

      throw error
    }
  }
}
