import { Block, BlockEntry } from "../block"

export class BlockResource {
  private blocks: Array<Block> = []

  put(id: number, code: string, entries: Array<BlockEntry>): Block {
    const block = new Block(this, id, code, entries)
    this.blocks.push(block)
    return block
  }

  after(block: Block): Array<Block> {
    const index = this.blocks.findIndex(({ id }) => id === block.id)
    if (index === -1) return []
    return this.blocks.slice(index)
  }

  before(block: Block): Array<Block> {
    const index = this.blocks.findIndex(({ id }) => id === block.id)
    if (index === -1) return []
    return this.blocks.slice(0, index)
  }

  all(): Array<Block> {
    return this.blocks
  }

  get outputs(): Array<string | undefined> {
    return this.blocks.flatMap(({ outputs }) => outputs)
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
