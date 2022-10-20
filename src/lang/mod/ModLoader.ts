import { Fetcher } from "../../framework/fetcher"
import { BlockLoader } from "../block"
import * as BlockParsers from "../block/block-parsers"
import { LangError } from "../errors"
import { Mod } from "../mod"

export class ModLoader {
  cache: Map<string, Mod> = new Map()
  private importing: Set<string> = new Set()
  fetcher = new Fetcher()
  blockLoader = new BlockLoader()

  constructor() {
    this.blockLoader.route(
      (url) => url.href.endsWith(".md"),
      new BlockParsers.MarkdownBlockParser(),
    )
    this.blockLoader.fallback(new BlockParsers.WholeBlockParser())
  }

  async load(url: URL, options?: { code?: string }): Promise<Mod> {
    const found = this.cache.get(url.href)
    if (found !== undefined) return found

    const code = options?.code ?? (await this.fetcher.fetch(url))
    const blocks = this.blockLoader.load(url, code)
    const mod = new Mod(url, { loader: this, blocks })

    this.cache.set(url.href, mod)
    return mod
  }

  async loadAndExecute(url: URL, options?: { code?: string }): Promise<Mod> {
    if (this.importing.has(url.href)) {
      throw new LangError(`I find circular import: ${url.href}`)
    }

    this.importing.add(url.href)

    const mod = await this.load(url, options)
    for (const block of mod.blocks.all()) {
      await block.execute(mod)
    }

    this.importing.delete(url.href)

    return mod
  }
}
