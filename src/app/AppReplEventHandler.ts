import {
  ReplEventHandler,
  type ReplEvent,
} from "@cicada-lang/framework/lib/repl/index.js"
import fs from "fs"
import * as Errors from "../lang0/errors/index.js"
import { Loader } from "../lang0/loader/index.js"
import { modExecuteStmts } from "../lang0/mod/modExecuteStmts.js"
import { Parser } from "../lang0/syntax/index.js"
import { colors } from "../utils/colors.js"

export class AppReplEventHandler extends ReplEventHandler {
  pathname = process.cwd() + "/repl"
  loader = new Loader({
    onOutput: (output) => console.log(colors.blue(output)),
  })
  parser = new Parser()

  constructor() {
    super()
    this.loader.fetcher.register("file", (url) =>
      fs.promises.readFile(url.pathname, "utf8"),
    )
    this.loader.fetcher.register("repl", (url) => {
      return url.pathname === this.pathname
        ? ""
        : fs.promises.readFile(url.pathname, "utf8")
    })
  }

  greeting(): void {
    console.log(`Welcome clique :)`)
    console.log(`Type ".help" for more information`)
  }

  async handle(event: ReplEvent): Promise<void> {
    let { text } = event

    text = text.trim()

    const url = new URL(`repl://${this.pathname}`)
    const mod = await this.loader.load(url, { text: "" })

    try {
      const stmts = this.parser.parseStmts(text)
      await modExecuteStmts(mod, stmts)
    } catch (error) {
      if (!(error instanceof Error)) {
        console.error(error)
      } else if (error instanceof Errors.ParsingError) {
        console.error(error.report(text))
      } else {
        console.error(error.message)
      }
    }
  }
}
