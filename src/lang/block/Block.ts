import { BlockResource } from "../block"
import { Mod } from "../mod"
import { Stmt } from "../stmt"

export type BlockEntry = {
  stmt: Stmt
  output?: string
  executed?: boolean
}

export class Block {
  constructor(
    public blocks: BlockResource,
    public id: number,
    public code: string,
    public entries: Array<BlockEntry>,
  ) {}

  get outputs(): Array<string | undefined> {
    return this.entries.map(({ output }) => output)
  }

  executed = false

  async execute(mod: Mod): Promise<void> {
    const blocks = [...this.blocks.before(this), this]
    for (const block of blocks) {
      await block.executeOne(mod)
    }
  }

  private async executeOne(mod: Mod): Promise<void> {
    if (this.executed) return

    for (const entry of this.entries) {
      if (entry.executed) continue
      const output = await entry.stmt.execute(mod)
      if (output) {
        entry.output = output
        entry.executed = true
      }
    }

    this.executed = true
  }
}
