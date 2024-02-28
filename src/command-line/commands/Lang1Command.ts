import { Command, CommandRunner } from "@xieyuheng/command-line"
import { ty } from "@xieyuheng/ty"
import fs from "fs"
import Path from "path"
import { Loader } from "../../lang1/loader/index.js"

type Args = { file: string }
type Opts = {}

export class Lang1Command extends Command<Args, Opts> {
  name = "lang1"

  description = "Run a lang1 file"

  args = { file: ty.string() }
  opts = {}

  loader: Loader

  constructor() {
    super()
    this.loader = new Loader({ onOutput: console.log })
    this.loader.fetcher.register("file", (url) =>
      fs.promises.readFile(url.pathname, "utf8"),
    )
  }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command run a lang1 file.`,
      ``,
      blue(`  ${runner.name} ${this.name} <file>`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const url = createURL(argv["file"])

    try {
      await this.loader.load(url)
    } catch (error) {
      console.error(error)
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
