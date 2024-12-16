import { type Exp } from "../exp/index.ts"
import { type Mod } from "../mod/index.ts"
import { type Value } from "../value/index.ts"

export type Definition = {
  mod: Mod
  name: string
  exp: Exp
  freeNames: Set<string>
  cache?: Value
}
