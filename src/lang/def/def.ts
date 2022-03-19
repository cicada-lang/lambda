import { Exp } from "../exp"
import { Mod } from "../mod"

export class Def {
  constructor(public mod: Mod, public name: string, exp: Exp) {}

  // refer(): Value
}
