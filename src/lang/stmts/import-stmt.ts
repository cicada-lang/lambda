import { Mod } from "../mod"
import { Stmt } from "../stmt"

export type ImportEntry = string | { name: string; rename: string }

export class ImportStmt extends Stmt {
  constructor(public path: string, public entries: Array<ImportEntry>) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    const importedMod = await mod.load(this.path)
    // for (const entry of this.entries) {}
    // importedMod
  }
}
