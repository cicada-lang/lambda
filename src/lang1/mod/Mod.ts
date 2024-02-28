import { type Definition } from "../definition/index.js"
import { type Loader } from "../loader/index.js"
import { type Stmt } from "../stmt/index.js"

export type Mod = {
  loader: Loader
  url: URL
  definitions: Map<string, Definition>
  outputs: Map<number, string>
  stmts: Array<Stmt>
}
