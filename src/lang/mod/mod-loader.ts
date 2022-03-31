import { ParsingError } from "@cicada-lang/sexp/lib/errors"
import { Fetcher } from "../../infra/fetcher"
import { Mod } from "../mod"
import { Parser } from "../parser"

export class ModLoader {
  cache: Map<string, Mod> = new Map()
  fetcher: Fetcher

  constructor(options?: { fetcher?: Fetcher }) {
    this.fetcher = options?.fetcher || new Fetcher()
  }

  async load(url: URL, options?: { text?: string }): Promise<Mod> {
    const found = this.cache.get(url.href)
    if (found !== undefined) return found

    const mod = new Mod(url, { loader: this })
    const text = options?.text ?? (await this.fetcher.fetch(url))

    await this.executeText(url, mod, text)
    this.cache.set(url.href, mod)
    return mod
  }

  private async executeText(url: URL, mod: Mod, text: string): Promise<void> {
    try {
      const parser = new Parser()
      const stmts = parser.parseStmts(text)
      for (const stmt of stmts) await stmt.execute(mod)
    } catch (error) {
      if (error instanceof ParsingError) {
        const report = error.span.report(text)
        console.error(report)
      }

      throw error
    }
  }
}
