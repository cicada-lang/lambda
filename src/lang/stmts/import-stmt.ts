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

  async execute(mod: Mod): Promise<void> {
    const importedMod = await mod.load(this.path)
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
}
