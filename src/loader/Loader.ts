import { Fetcher } from "@cicada-lang/framework/lib/fetcher/index.js"
import * as Errors from "../lang0/errors/index.js"
import { createMod, modExecuteStmts, type Mod } from "../lang0/mod/index.js"
import { Parser } from "../lang0/syntax/index.js"

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
    await run(mod, text)
    this.cache.set(url.href, { mod, text })
    return mod
  }
}

async function run(mod: Mod, text: string): Promise<void> {
  const parser = new Parser()

  try {
    const stmts = parser.parseStmts(text)
    await modExecuteStmts(mod, stmts)
  } catch (error) {
    if (error instanceof Errors.ParsingError) {
      throw new Errors.ErrorReport(error.report(text))
    }

    throw error
  }
}
