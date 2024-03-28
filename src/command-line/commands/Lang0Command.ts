import { Command, CommandRunner } from "@xieyuheng/command-line"
import { ty } from "@xieyuheng/ty"
import fs from "fs"
import Path from "path"
import { run } from "../../lang0/run/index.js"

type Args = { file: string }
type Opts = {}

export class Lang0Command extends Command<Args, Opts> {
  name = "lang0"

  description = "Run a lang0 file"

  args = { file: ty.string() }
  opts = {}

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command run a lang0 file.`,
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
