import { Command } from "@enchanterjs/enchanter/lib/command"
import { CommandRunner } from "@enchanterjs/enchanter/lib/command-runner"
import ty from "@xieyuheng/ty"
import Path from "path"
import { FileModLoader } from "../../lang/mod/mod-loaders/file-mod-loader"

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
    const loader = new FileModLoader()
    const mod = await loader.load(url)
  }
}
