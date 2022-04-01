import { Block } from "./block"

export class BlockResource {
  constructor(public blocks: Array<Block>) {}

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
