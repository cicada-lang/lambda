import { Def } from "../def"
import { Env } from "../env"
import { Exp } from "../exp"
import { ModLoader } from "../mod"
import { Value } from "../value"
import { BlockResource, Block } from "../block"

export class Mod {
  output = ""
  defs: Map<string, Def> = new Map()
  loader: ModLoader
  blocks: BlockResource

  constructor(
    public url: URL,
    options: {
      loader: ModLoader
      blocks: BlockResource
    }
  ) {
    this.loader = options.loader
    this.blocks = options.blocks
  }

  async import(url: URL | string): Promise<Mod> {
    return await this.loader.load(
      typeof url === "string" ? this.resolve(url) : url
    )
  }

  private resolve(href: string): URL {
    return new URL(href, this.url)
  }

  define(name: string, exp: Exp): void {
    const value = exp.evaluate(this, Env.init())
    this.defs.set(name, new Def(this, name, value))
  }

  lookup(name: string): Value | undefined {
    const def = this.defs.get(name)
    if (def === undefined) return undefined
    return def.value
  }
}
