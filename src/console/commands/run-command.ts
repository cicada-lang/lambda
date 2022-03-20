import { Command } from "@enchanterjs/enchanter/lib/command"
import { CommandRunner } from "@enchanterjs/enchanter/lib/command-runner"
import { CommonHelpCommand } from "@enchanterjs/enchanter/lib/commands"
import ty from "@xieyuheng/ty"
import fs from "fs"
import { ModLoader } from "../../lang/mod"
import { createUrl } from "../../ut/url"

type Args = { file?: string }
type Opts = {}

export class RunCommand extends Command<Args, Opts> {
  name = "run"

  description = "Run a file"

  args = { file: ty.optional(ty.string()) }
  opts = {}

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command run a file.`,
      ``,
      blue(`  ${runner.name} ${this.name} docs/tests/nat.scm`),
      ``,
      `It is the default command, thus you can drop the command name.`,
      ``,
      blue(`  ${runner.name} docs/tests/nat.scm`),
      ``,
      `It can also run a file from a URL.`,
      ``,
      blue(`  ${runner.name} https://readonly.link/files/cicada-lang/lambda/-/docs/tests/nat.scm`),
      ``,
    ].join("\n")
  }

  loader = new ModLoader({
    urlLoaders: {
      "file:": (url: URL) => fs.promises.readFile(url.pathname, "utf8"),
    },
  })

  async execute(argv: Args & Opts, runner: CommandRunner): Promise<void> {
    if (!argv.file) {
      new CommonHelpCommand().execute(argv as any, runner)
      return
    }

    try {
      await this.loader.load(createUrl(argv.file))
    } catch (error) {
      if (!(error instanceof Error)) console.error(error)
      else console.error(error.message)
    }
  }
}
