import fs from "fs"
import { ReplEvent, ReplEventHandler } from "../framework/repl"
import * as Errors from "../lang/errors"
import { Parser } from "../lang/parser"
import { Loader } from "../loader"
import { colors } from "../utils/colors"

export class AppReplEventHandler extends ReplEventHandler {
  parser = new Parser()

  loader = new Loader({
    onOutput: (output) => console.log(colors.blue(output)),
  })

  constructor() {
    super()
    this.loader.fetcher.register("file", (url) =>
      fs.promises.readFile(url.pathname, "utf8"),
    )
    this.loader.fetcher.register("repl", (url) =>
      url.pathname ? fs.promises.readFile("./" + url.pathname, "utf8") : "",
    )
  }

  greeting(): void {
    console.log(`Welcome to Mugda ${app.config.pkg.version}`)
    console.log(`Type ".help" for more information`)
  }

  async handle(event: ReplEvent): Promise<boolean> {
    let { text } = event

    text = text.trim()

    const url = new URL("repl://")
    const mod = await this.loader.load(url)

    try {
      const stmts = this.parser.parseStmts(text)
      await mod.executeStmts(stmts)
      return true
    } catch (error) {
      if (!(error instanceof Error)) {
        console.error(error)
      } else if (error instanceof Errors.ParsingError) {
        console.error(error.report(text))
      } else if (error instanceof Errors.ElaborationError) {
        console.error(error.report(text))
      } else {
        console.error(error.message)
      }

      return false
    }
  }
}
