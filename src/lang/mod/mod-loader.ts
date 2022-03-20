import { ParsingError } from "@cicada-lang/sexp/lib/errors"
import axios from "axios"
import { Mod } from "../mod"
import { Parser } from "../parser"

export interface UrlLoader {
  (url: URL): Promise<string>
}

async function loadHttp(url: URL): Promise<string> {
  const { data } = await axios.get(url.href)
  return data
}

export class ModLoader {
  urlLoaders: Record<string, UrlLoader>

  constructor(options?: { urlLoaders?: Record<string, UrlLoader> }) {
    this.urlLoaders = {
      "http:": loadHttp,
      "https:": loadHttp,
      ...(options?.urlLoaders || {}),
    }
  }

  async loadText(url: URL): Promise<string> {
    const load = this.urlLoaders[url.protocol]
    if (load === undefined) {
      throw new Error(`Unknown protocol: ${url.protocol}`)
    }

    return await load(url)
  }

  async load(url: URL): Promise<Mod> {
    const mod = new Mod(url)
    const parser = new Parser()
    const text = await this.loadText(url)

    try {
      const stmts = parser.parseStmts(text)
      for (const stmt of stmts) stmt.execute(mod)
      return mod
    } catch (error) {
      if (error instanceof ParsingError) {
        const report = error.span.report(text)
        console.error(report)
      }

      throw error
    }
  }
}
