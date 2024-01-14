import { type Mod } from "../lang0/mod/index.js"

export abstract class Script {
  abstract mod: Mod
  abstract run(): Promise<void>
}
