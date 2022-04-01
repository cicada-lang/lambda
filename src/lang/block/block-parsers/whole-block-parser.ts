import { Block, BlockParser, BlockResource } from "../../block"
import { Parser } from "../../parser"

export class WholeBlockParser extends BlockParser {
  parseBlocks(text: string): BlockResource {
    const parser = new Parser()
    const stmts = parser.parseStmts(text)
    const entries = stmts.map((stmt) => ({ stmt }))
    const block = new Block(0, text, entries)
    throw new BlockResource([block])
  }
}
