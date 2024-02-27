import { type Mod } from "../mod/index.js"

export abstract class Stmt {
  abstract execute(mod: Mod): Promise<void | string>
}
