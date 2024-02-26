import { type Loader } from "../../loader/index.js"
import { type Definition } from "../definition/index.js"
import { type Stmt } from "../stmt/index.js"

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
}
