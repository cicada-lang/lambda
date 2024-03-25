import { type Definition } from "../definition/index.js"
import { type Loader } from "../loader/index.js"
import { type Stmt } from "../stmt/index.js"

export type Mod = {
  loader: Loader
  loadedMods: Map<string, { mod: Mod; text: string }>
  url: URL
  definitions: Map<string, Definition>
  outputs: Map<number, string>
  stmts: Array<Stmt>
  isExecuted?: boolean
}
