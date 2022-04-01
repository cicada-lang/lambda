import { BlockResource } from "../block"
import { Mod } from "../mod"
import { Stmt } from "../stmt"

export type BlockEntry = {
  stmt: Stmt
  output?: string
}

export class Block {
  constructor(
    public blocks: BlockResource,
    public id: number,
    public code: string,
    public entries: Array<BlockEntry>
  ) {}

  async execute(mod: Mod, options?: { silent?: boolean }): Promise<void> {
    for (const entry of this.entries) {
      const output = await entry.stmt.execute(mod)
      if (output) {
        entry.output = output
        if (!options?.silent) {
          console.log(entry.output)
        }
      }
    }
  }

  get outputs(): Array<string | undefined> {
    return this.entries.map(({ output }) => output)
  }
}
