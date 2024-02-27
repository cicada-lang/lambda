import { type Mod } from "../lang0/mod/index.js"
import { type Script } from "../script/index.js"
import * as Scripts from "../scripts/index.js"

export function createScript(mod: Mod, text: string): Script {
  return new Scripts.DefaultScript(mod, text)
}
