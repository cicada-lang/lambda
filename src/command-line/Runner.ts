import fs from "fs"
import { Loader } from "../lang0/loader/index.js"

export class Runner {
  loader: Loader

  constructor() {
    this.loader = new Loader({ onOutput: console.log })
    this.loader.fetcher.register("file", (url) =>
      fs.promises.readFile(url.pathname, "utf8"),
    )
  }

  async run(
    url: URL,
    opts?: { silent?: boolean },
  ): Promise<{ error?: unknown }> {
    try {
      await this.loader.load(url)
      return { error: undefined }
    } catch (error) {
      if (!opts?.silent) {
        console.error(error)
      }

      return { error }
    }
  }
}
