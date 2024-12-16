import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import fs from "fs"
import Path from "path"
import { run } from "../../lang/run/index.ts"

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
      blue(`  ${runner.name} ${this.name} <file>`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const url = createURL(argv["file"])

    try {
      await run(url)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
        process.exit(1)
      }

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
