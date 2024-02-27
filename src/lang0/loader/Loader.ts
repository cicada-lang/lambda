import { Fetcher } from "@cicada-lang/framework/lib/fetcher/index.js"
import * as Errors from "../errors/index.js"
import { createMod, modExecuteStmts, type Mod } from "../mod/index.js"
import { Parser } from "../syntax/index.js"

export interface LoaderOptions {
  onOutput?: (output: string) => void
}

export class Loader {
  cache: Map<string, { mod: Mod; text: string }> = new Map()
  fetcher = new Fetcher()

  constructor(public options: LoaderOptions) {}

  async load(url: URL, options?: { text?: string }): Promise<Mod> {
    const found = this.cache.get(url.href)
    if (found !== undefined) return found.mod

    const text = options?.text || (await this.fetcher.fetch(url))
    const mod = createMod({ url, loader: this })

    try {
      const parser = new Parser()
      const stmts = parser.parseStmts(text)
      await modExecuteStmts(mod, stmts)

      this.cache.set(url.href, { mod, text })
      return mod
    } catch (error) {
      if (error instanceof Errors.ParsingError) {
        throw new Errors.ErrorReport(error.report(text))
      }

      throw error
    }
  }
}
