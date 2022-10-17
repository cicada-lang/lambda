import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import fs from "fs"
import { LangError } from "../../lang/errors"
import { ModLoader } from "../../lang/mod"
import { colors } from "../../utils/colors"
import { createUrl } from "../../utils/createUrl"
import * as Commands from "../commands"

type Args = { file?: string }
type Opts = {}

export class RunCommand extends Command<Args, Opts> {
  name = "run"

  description = "Run a file"

  args = { file: ty.optional(ty.string()) }
  opts = {}

  loader = new ModLoader()

  constructor() {
    super()
    this.loader.fetcher.register("file", (url) =>
      fs.promises.readFile(url.pathname, "utf8"),
    )
  }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command run a file.`,
      ``,
      blue(`  ${runner.name} ${this.name} docs/tests/nat-church.md`),
      ``,
      `It is the default command, thus you can drop the command name.`,
      ``,
      blue(`  ${runner.name} docs/tests/nat-church.md`),
      ``,
      `It can also run a file from a URL.`,
      ``,
      blue(`  ${runner.name} https://cdn.lambda.cic.run/tests/nat-church.md`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts, runner: CommandRunner): Promise<void> {
    if (!argv.file) {
      new Commands.CommonHelpCommand().execute(argv as any, runner)
      return
    }

    try {
      const mod = await this.loader.loadAndExecute(createUrl(argv.file))
      for (const output of mod.blocks.outputs) {
        if (output) {
          console.log(output)
        }
      }
    } catch (error) {
      if (error instanceof LangError) {
        console.error(colors.bold(colors.yellow(error.message)))
        process.exit(1)
      }

      throw error
    }
  }
}
