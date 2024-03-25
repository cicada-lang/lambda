import { type Definition } from "../definition/index.js"
import { type Loader } from "../loader/index.js"
import { type Stmt } from "../stmt/index.js"

export type Mod = {
  loader: Loader
  url: URL
  loadedMods: Map<string, { mod: Mod; text: string }>  
  definitions: Map<string, Definition>
  stmts: Array<Stmt>
  isExecuted?: boolean
}
