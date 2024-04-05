import { type Definition } from "../definition/index.js"
import { type Stmt } from "../stmt/index.js"

export type Mod = {
  url: URL
  loadedMods: Map<string, { mod: Mod; text: string }>
  definitions: Map<string, Definition>
  stmts: Array<Stmt>
  isFinished?: boolean
}
