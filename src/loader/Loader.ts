import { Fetcher } from "@cicada-lang/framework/lib/fetcher/index.js"
import { createMod, type Mod } from "../lang0/mod/index.js"
import { type Script } from "../script/index.js"
import * as Scripts from "../scripts/index.js"

export interface LoaderOptions {
  onOutput?: (output: string) => void
}

export class Loader {
  cache: Map<string, Script> = new Map()
  fetcher = new Fetcher()

  constructor(public options: LoaderOptions) {}

  async load(url: URL, options?: { text?: string }): Promise<Mod> {
    const found = this.cache.get(url.href)
    if (found !== undefined) return found.mod

    const text = options?.text || (await this.fetcher.fetch(url))
    const mod = createMod({ url, loader: this })
    const script = Scripts.createScript(mod, text)
    await script.run()
    this.cache.set(url.href, script)
    return script.mod
  }
}
