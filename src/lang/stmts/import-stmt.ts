import { Mod } from "../mod"
import { Stmt } from "../stmt"

export type ImportEntry = string | { name: string; reanme: string }

export class ImportStmt extends Stmt {
  constructor(public entries: ImportEntry, public url: URL) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    console.log(this.entries, this.url)
    //
  }
}
