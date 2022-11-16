import { Loader } from "../../loader"
import { Def } from "../def"
import { LangError } from "../errors"
import { Stmt } from "../stmt"
import type { Value } from "../value"

export interface ModOptions {
  url: URL
  loader: Loader
}

export class Mod {
  private defs: Map<string, Def> = new Map()
  outputs: Map<number, string> = new Map()
  stmts: Array<Stmt> = []

  constructor(public options: ModOptions) {}

  resolve(href: string): URL {
    return new URL(href, this.options.url)
  }

  async executeStmts(stmts: Array<Stmt>): Promise<void> {
    const offset = this.stmts.length
    for (const [index, stmt] of stmts.entries()) {
      const output = await stmt.execute(this)
      this.stmts.push(stmt)
      if (output) {
        this.outputs.set(offset + index, output)
        if (this.options.loader.options.onOutput) {
          this.options.loader.options.onOutput(output)
        }
      }
    }
  }

  define(name: string, def: Def): void {
    this.assertNotRedefine(name)
    this.defs.set(name, def)
  }

  private assertNotRedefine(name: string): void {
    if (this.find(name)) {
      throw new LangError(`I can not redefine name: ${name}`)
    }
  }

  find(name: string): Def | undefined {
    return this.defs.get(name)
  }

  delete(name: string): void {
    this.defs.delete(name)
  }

  findValue(name: string): Value | undefined {
    const def = this.find(name)
    if (def === undefined) return undefined
    return def.value
  }
}
