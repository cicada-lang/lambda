import { Mod } from "../mod"
import { Exp } from "../exp"

export class Def {
  constructor(public mod: Mod, public name: string, exp: Exp) {}

  // refer(): Value
}
