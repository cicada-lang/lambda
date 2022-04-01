import { Fetcher } from "../../infra/fetcher"
import { ParsingError } from "../errors"
import { Mod } from "../mod"
import { Parser } from "../parser"

export class ModLoader {
  cache: Map<string, Mod> = new Map()
  fetcher = new Fetcher()

  async load(url: URL, options?: { code?: string }): Promise<Mod> {
    const found = this.cache.get(url.href)
    if (found !== undefined) return found

    const mod = new Mod(url, { loader: this })
    const code = options?.code ?? (await this.fetcher.fetch(url))

    await this.executeCode(url, mod, code)
    this.cache.set(url.href, mod)
    return mod
  }

  private async executeCode(url: URL, mod: Mod, code: string): Promise<void> {
    try {
      const parser = new Parser()
      const stmts = parser.parseStmts(code)
      for (const stmt of stmts) await stmt.execute(mod)
    } catch (error) {
      if (error instanceof ParsingError) {
        console.error(error.span.report(code))
      }

      throw error
    }
  }
}
