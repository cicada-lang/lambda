import { Command, CommandRunner } from "@xieyuheng/command-line"
import { ty } from "@xieyuheng/ty"
import fs from "fs"
import Path from "path"
import { Runner } from "../Runner.js"

type Args = { file: string }
type Opts = {}

export class RunCommand extends Command<Args, Opts> {
  name = "run"

  description = "Run a file"

  args = { file: ty.string() }
  opts = {}

  runner = new Runner()

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
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const url = createURL(argv["file"])

    const { error } = await this.runner.run(url)
    if (error) {
      process.exit(1)
    }
  }
}

function createURL(path: string): URL {
  if (ty.url().isValid(path)) {
    return new URL(path)
  }

  if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
    const fullPath = Path.resolve(path)
    return new URL(`file:${fullPath}`)
  }

  throw new Error(`I can not create URL from path: ${path}`)
}
