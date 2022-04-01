import { Mod } from "../mod"
import { Stmt } from "../stmt"

export type ImportEntry = {
  name: string
  rename?: string
}

export class ImportStmt extends Stmt {
  constructor(public path: string, public entries: Array<ImportEntry>) {
    super()
  }

  async execute(mod: Mod): Promise<void | string> {
    const importedMod = await mod.import(this.path)
    for (const { name, rename } of this.entries) {
      const def = importedMod.defs.get(name)
      if (def === undefined) {
        throw new Error(
          `I can not import undefined name: ${name}, from path: ${this.path}`
        )
      }

      mod.defs.set(rename || name, def)
    }
  }

  async undo(mod: Mod): Promise<void> {
    for (const { name, rename } of this.entries) {
      mod.defs.delete(rename || name)
    }
  }
}
