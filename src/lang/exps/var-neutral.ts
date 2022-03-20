import { Exp } from "../exp"
import * as Exps from "../exps"
import { Neutral } from "../neutral"

export class VarNeutral extends Neutral {
  constructor(public name: string) {
    super()
  }

  readback(used: Set<string>): Exp {
    return new Exps.Var(this.name)
  }

  format(): string {
    return this.name
  }
}
