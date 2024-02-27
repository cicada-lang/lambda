import { type Exp } from "../exp/index.js"
import { type Mod } from "../mod/index.js"

export type Definition = {
  mod: Mod
  name: string
  exp: Exp
}
