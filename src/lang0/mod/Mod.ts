import { type Loader } from "../../loader/index.js"
import { type Definition } from "../definition/index.js"
import { evaluateDefinition } from "../evaluate/index.js"
import { type Stmt } from "../stmt/index.js"
import { type Value } from "../value/index.js"
import { modFind } from "./modFind.js"

export class Mod {
  loader: Loader
  url: URL
  definitions: Map<string, Definition> = new Map()
  outputs: Map<number, string> = new Map()
  stmts: Array<Stmt> = []

  constructor(options: { url: URL; loader: Loader }) {
    this.url = options.url
    this.loader = options.loader
  }

  async executeStmts(stmts: Array<Stmt>): Promise<void> {
    const offset = this.stmts.length
    for (const [index, stmt] of stmts.entries()) {
      const output = await stmt.execute(this)
      this.stmts.push(stmt)
      if (output) {
        this.outputs.set(offset + index, output)
        if (this.loader.options.onOutput) {
          this.loader.options.onOutput(output)
        }
      }
    }
  }

  delete(name: string): void {
    this.definitions.delete(name)
  }

  findValue(name: string): Value | undefined {
    const definition = modFind(this, name)
    if (definition === undefined) return undefined
    return evaluateDefinition(definition)
  }
}
