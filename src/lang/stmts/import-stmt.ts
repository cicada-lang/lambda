import { Mod } from "../mod"
import { Stmt } from "../stmt"

export type ImportEntry = string | { name: string; rename: string }

export class ImportStmt extends Stmt {
  constructor(public url: string, public entries: Array<ImportEntry>) {
    super()
  }

  async execute(mod: Mod): Promise<void> {

    console.log(this.url, this.entries)
    // const url = mod.resolve(this.url)
    // const importedMod = mod.loader.load(url)
    // importedMod
    //
  }
}
