import { ParsingError } from "@cicada-lang/sexp/lib/errors"
import { Command } from "@enchanterjs/enchanter/lib/command"
import { CommandRunner } from "@enchanterjs/enchanter/lib/command-runner"
import ty from "@xieyuheng/ty"
import fs from "fs"
import Path from "path"
import { Mod } from "../../lang/mod"
import { Parser } from "../../lang/parser"

type Args = { file: string }
type Opts = {}

export class RunCommand extends Command<Args, Opts> {
  name = "run"

  description = "Run a file"

  args = { file: ty.string() }
  opts = {}

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command run a file.`,
      ``,
      blue(`  ${runner.name} ${this.name} docs/tests/number.scm`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const file = Path.resolve(argv.file)
    const url = new URL(`file:${file}`)
    const mod = new Mod(url)

    const text = await fs.promises.readFile(file, "utf8")
    const parser = new Parser()

    try {
      const stmts = parser.parseStmts(text)

      for (const stmt of stmts) {
        stmt.execute(mod)
      }
    } catch (error) {
      if (error instanceof ParsingError) {
        const report = error.span.report(text)
        console.error(report)
      }

      throw error
    }
  }
}
