import { ParsingError } from "@cicada-lang/sexp/lib/errors"
import { builtinUrlLoaders, UrlLoader } from "../../ut/url-loader"
import { Mod } from "../mod"
import { Parser } from "../parser"

export class ModLoader {
  urlLoaders: Record<string, UrlLoader>

  constructor(options?: { urlLoaders?: Record<string, UrlLoader> }) {
    this.urlLoaders = { ...builtinUrlLoaders, ...(options?.urlLoaders || {}) }
  }

  async loadText(url: URL): Promise<string> {
    const load = this.urlLoaders[url.protocol]
    if (load === undefined) {
      throw new Error(`Unknown protocol: ${url.protocol}`)
    }

    return await load(url)
  }

  async load(url: URL): Promise<Mod> {
    const mod = new Mod(url)
    const parser = new Parser()
    const text = await this.loadText(url)

    try {
      const stmts = parser.parseStmts(text)
      for (const stmt of stmts) stmt.execute(mod)
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
