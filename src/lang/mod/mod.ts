import { Def } from "../def"
import { Exp } from "../exp"
import { ModLoader } from "../mod"
import { Value } from "../value"

export class Mod {
  loaders: Map<string, ModLoader> = new Map()
  defs: Map<string, Def> = new Map()

  constructor(public url: URL) {}

  async load(url: URL | string): Promise<Mod> {
    if (typeof url === "string") {
      url = this.resolve(url)
    }

    const loader = this.loaders.get(url.protocol)
    if (loader === undefined) {
      throw new Error(`Unknown protocol: ${url.protocol}`)
    }

    return await loader.load(url)
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
