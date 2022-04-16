import { BlockResource } from "../block"
import { Def } from "../def"
import { ModLoader } from "../mod"
import { Value } from "../value"

export class Mod {
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
    return await this.loader.loadAndExecute(
      typeof url === "string" ? this.resolve(url) : url
    )
  }

  private resolve(href: string): URL {
    return new URL(href, this.url)
  }

  find(name: string): Value | undefined {
    const def = this.defs.get(name)
    if (def === undefined) return undefined
    return def.value
  }

  async executeAllBlocks(options?: { silent?: boolean }): Promise<void> {
    for (const block of this.blocks.all()) {
      await block.execute(this, options)
    }
  }
}
