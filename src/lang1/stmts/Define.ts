import { type Exp } from "../exp/index.js"
import { modDefine, type Mod } from "../mod/index.js"
import { Stmt } from "../stmt/index.js"

export class Define extends Stmt {
  constructor(
    public name: string,
    public exp: Exp,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    modDefine(mod, this.name, {
      mod,
      name: this.name,
      exp: this.exp,
    })
  }
}
