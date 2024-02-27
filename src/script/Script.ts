import * as Errors from "../lang0/errors/index.js"
import { modExecuteStmts, type Mod } from "../lang0/mod/index.js"
import { Parser } from "../lang0/syntax/index.js"

export class Script {
  parser = new Parser()

  constructor(
    public mod: Mod,
    public text: string,
  ) {}

  async run(): Promise<void> {
    try {
      const stmts = this.parser.parseStmts(this.text)
      await modExecuteStmts(this.mod, stmts)
    } catch (error) {
      if (error instanceof Errors.ParsingError) {
        throw new Errors.ErrorReport(error.report(this.text))
      }

      throw error
    }
  }
}
