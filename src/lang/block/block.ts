import { Mod } from "../mod"
import { Stmt } from "../stmt"

export type StmtEntry = {
  stmt: Stmt
  output?: string
}

export class Block {
  constructor(
    public id: number,
    public code: string,
    public entries: Array<StmtEntry>
  ) {}

  async execute(mod: Mod, options?: { silent?: boolean }): Promise<void> {
    for (const entry of this.entries) {
      entry.output = await entry.stmt.execute(mod)
      if (entry.output && !options?.silent) {
        console.log(entry.output)
      }
    }
  }

  get outputs(): Array<string | undefined> {
    return this.entries.map(({ output }) => output)
  }
}
