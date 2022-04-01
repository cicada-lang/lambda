import { Env } from "../env"
import { Block } from "./block"

export class BlockResource {
  blocks: Array<Block> = []
  counter: number = 0
  backups: Array<{ env: Env }> = []

  constructor(blocks: Array<Block>) {
    this.blocks = blocks
  }

  get outputs(): Array<string> {
    return this.blocks.flatMap(({ stmts }) => stmts.map(({ output }) => output))
  }

  get length(): number {
    return this.blocks.length
  }

  get(id: number): Block | undefined {
    return this.blocks.find((block) => block.id === id)
  }

  getOrFail(id: number): Block {
    const block = this.get(id)
    if (block === undefined) {
      throw new Error(`Fail to get code block for id: ${id}`)
    }

    return block
  }

  has(id: number): boolean {
    return Boolean(this.get(id))
  }
}
