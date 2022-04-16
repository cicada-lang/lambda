import { BlockResource } from "../block"
import { Def } from "../def"
import { LangError } from "../errors"
import { ModLoader } from "../mod"
import { Value } from "../value"

export class Mod {
  private defs: Map<string, Def> = new Map()
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

  define(name: string, def: Def): void {
    this.assertNotRedefine(name)
    this.defs.set(name, def)
  }

  private assertNotRedefine(name: string): void {
    if (this.find(name)) {
      throw new LangError(`I can not redefine name: ${name}`)
    }
  }

  find(name: string): Def | undefined {
    return this.defs.get(name)
  }

  delete(name: string): void {
    this.defs.delete(name)
  }

  findValue(name: string): Value | undefined {
    const def = this.find(name)
    if (def === undefined) return undefined
    return def.value
  }

  async executeAllBlocks(options?: { silent?: boolean }): Promise<void> {
    for (const block of this.blocks.all()) {
      await block.execute(this, options)
    }
  }
}
