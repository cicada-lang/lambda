import { type Loader } from "../../loader/index.js"
import { type Definition } from "../definition/index.js"
import { LangError } from "../errors/index.js"
import { type Stmt } from "../stmt/index.js"
import { type Value } from "../value/index.js"

export interface ModOptions {
  url: URL
  loader: Loader
}

export class Mod {
  private definitions: Map<string, Definition> = new Map()
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

  define(name: string, definition: Definition): void {
    this.assertNotRedefine(name)
    this.definitions.set(name, definition)
  }

  private assertNotRedefine(name: string): void {
    if (this.find(name)) {
      throw new LangError(`I can not redefine name: ${name}`)
    }
  }

  find(name: string): Definition | undefined {
    return this.definitions.get(name)
  }

  delete(name: string): void {
    this.definitions.delete(name)
  }

  findValue(name: string): Value | undefined {
    const definition = this.find(name)
    if (definition === undefined) return undefined
    return definition.value
  }
}
