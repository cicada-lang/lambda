import * as Errors from "../lang0/errors/index.js"
import { type Mod } from "../lang0/mod/index.js"
import { Parser } from "../lang0/syntax/index.js"
import { Script } from "../script/index.js"

export class DefaultScript extends Script {
  parser = new Parser()

  constructor(
    public mod: Mod,
    public text: string,
  ) {
    super()
  }

  async run(): Promise<void> {
    try {
      const stmts = this.parser.parseStmts(this.text)
      await this.mod.executeStmts(stmts)
    } catch (error) {
      if (error instanceof Errors.ParsingError) {
        throw new Errors.ErrorReport(error.report(this.text))
      }

      if (error instanceof Errors.ElaborationError) {
        throw new Errors.ErrorReport(error.report(this.text))
      }

      throw error
    }
  }
}
