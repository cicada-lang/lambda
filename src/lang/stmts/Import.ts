import * as Errors from "../errors/index.js"
import type { Mod } from "../mod/index.js"
import { Stmt } from "../stmt/index.js"

export type ImportEntry = {
  name: string
  rename?: string
}

export class Import extends Stmt {
  constructor(
    public path: string,
    public entries: Array<ImportEntry>,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    const importedMod = await this.import(mod)
    for (const { name, rename } of this.entries) {
      const def = importedMod.find(name)
      if (def === undefined) {
        throw new Error(
          `I can not import undefined name: ${name}, from path: ${this.path}`,
        )
      }

      mod.define(rename || name, def)
    }
  }

  async import(mod: Mod): Promise<Mod> {
    const url = mod.resolve(this.path)
    if (url.href === mod.options.url.href) {
      throw new Errors.LangError(`I can not circular import: ${this.path}`)
    }

    return await mod.options.loader.load(url)
  }

  async undo(mod: Mod): Promise<void> {
    for (const { name, rename } of this.entries) {
      mod.delete(rename || name)
    }
  }
}
