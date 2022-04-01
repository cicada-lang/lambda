import { Block, BlockParser, BlockResource } from "../../block"
import { ParsingError } from "../../errors"
import { Parser } from "../../parser"

export class WholeBlockParser extends BlockParser {
  parseBlocks(text: string): BlockResource {
    try {
      const parser = new Parser()
      const stmts = parser.parseStmts(text)
      const entries = stmts.map((stmt) => ({ stmt }))
      const block = new Block(0, text, entries)
      return new BlockResource([block])
    } catch (error) {
      if (error instanceof ParsingError) {
        console.error(error.span.report(text))
      }

      throw error
    }
  }
}
