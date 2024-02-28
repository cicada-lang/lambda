import { type Exp } from "../exp/index.js"
import { formatExp } from "../format/formatExp.js"
import { type Mod } from "../mod/index.js"
import { reduce } from "../reduce/reduce.js"
import { Stmt } from "../stmt/index.js"

export class Compute extends Stmt {
  constructor(public exp: Exp) {
    super()
  }

  async execute(mod: Mod): Promise<void | string> {
    const reducedExp = reduce(mod, this.exp)
    return formatExp(reducedExp)
  }
}
