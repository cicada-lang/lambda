import { builtinNames } from "../builtin/index.js"
import { LangError } from "../errors/index.js"
import * as Exps from "../exp/index.js"
import { type Exp } from "../exp/index.js"
import { modDefine, modFind, type Mod } from "../mod/index.js"
import { Stmt } from "../stmt/index.js"

export class Define extends Stmt {
  constructor(
    public name: string,
    public exp: Exp,
  ) {
    super()
  }

  private assertAllNamesDefined(mod: Mod): void {
    const freeNames = Exps.freeNames(
      new Set([this.name, ...builtinNames]),
      this.exp,
    )
    for (const name of freeNames) {
      if (modFind(mod, name) === undefined) {
        throw new LangError(
          [
            `I find undefined name: ${name}`,
            `  defining: ${this.name}`,
            `  body: ${Exps.formatExp(this.exp)}`,
          ].join("\n"),
        )
      }
    }
  }

  async execute(mod: Mod): Promise<void> {
    this.assertAllNamesDefined(mod)

    modDefine(mod, this.name, {
      mod,
      name: this.name,
      exp: this.exp,
    })
  }
}
