import { BlockResource } from "../block"
import { Mod } from "../mod"
import { Parser } from "../parser"
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
    public entries: Array<BlockEntry>
  ) {}

  get outputs(): Array<string | undefined> {
    return this.entries.map(({ output }) => output)
  }

  executed = false

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

  async execute(mod: Mod): Promise<void> {
    const blocks = [...this.blocks.before(this), this]
    for (const block of blocks) {
      await block.executeOne(mod)
    }
  }

  async run(mod: Mod, code: string): Promise<void> {
    await this.undo(mod)
    this.update(code)
    await this.execute(mod)
  }

  private update(code: string): void {
    this.code = code
    this.reparse()
  }

  private reparse(): void {
    const parser = new Parser()
    const stmts = parser.parseStmts(this.code)
    this.entries = stmts.map((stmt) => ({ stmt }))
  }

  private async undo(mod: Mod): Promise<void> {
    const blocks = [this, ...this.blocks.after(this)].reverse()
    for (const block of blocks) {
      await block.undoOne(mod)
    }
  }

  private async undoOne(mod: Mod): Promise<void> {
    for (const entry of this.entries) {
      await entry.stmt.undo(mod)
      delete entry.output
      entry.executed = false
    }

    this.executed = false
  }
}
