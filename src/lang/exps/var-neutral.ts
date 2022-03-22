import { Exp } from "../exp"
import * as Exps from "../exps"
import { Neutral } from "../neutral"

export class VarNeutral extends Neutral {
  preHash: string

  constructor(public name: string) {
    super()
    this.preHash = name
  }

  readback(used: Set<string>): Exp {
    return new Exps.Var(this.name)
  }
}
