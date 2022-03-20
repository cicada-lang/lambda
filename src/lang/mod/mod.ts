import { Def } from "../def"
import { Exp } from "../exp"
import { ModLoader } from "../mod"
import { Value } from "../value"

export class Mod {
  loader = new ModLoader()
  cache: Map<string, Mod> = new Map()
  defs: Map<string, Def> = new Map()

  constructor(public url: URL) {}

  async load(url: URL | string): Promise<Mod> {
    if (typeof url === "string") {
      url = this.resolve(url)
    }

    const found = this.cache.get(url.href)
    if (found !== undefined) {
      return found
    }

    const mod = await this.loader.load(url)
    this.cache.set(url.href, mod)
    return mod
  }

  resolve(href: string): URL {
    return new URL(href, this.url)
  }

  define(name: string, exp: Exp): void {
    this.defs.set(name, new Def(this, name, exp))
  }

  lookup(name: string): Value | undefined {
    const def = this.defs.get(name)
    if (def === undefined) return undefined
    return def.refer()
  }
}
