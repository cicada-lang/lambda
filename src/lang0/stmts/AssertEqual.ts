import { Env } from "../env/index.js"
import { equivalent, EquivalentCtx } from "../equivalent/index.js"
import { AssertionError } from "../errors/index.js"
import { evaluate } from "../evaluate/index.js"
import * as Exps from "../exp/index.js"
import { type Exp } from "../exp/index.js"
import { type Mod } from "../mod/index.js"
import { Stmt } from "../stmt/index.js"

export class AssertEqual extends Stmt {
  constructor(public exps: Array<Exp>) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    for (let i = 0; i < this.exps.length - 1; i++) {
      this.assertEqual(mod, this.exps[i], this.exps[i + 1])
    }
  }

  async undo(mod: Mod): Promise<void> {}

  private assertEqual(mod: Mod, left: Exp, right: Exp): void {
    const leftValue = evaluate(mod, Env.init(), left)
    const rightValue = evaluate(mod, Env.init(), right)
    if (!equivalent(EquivalentCtx.init(), leftValue, rightValue)) {
      throw new AssertionError(
        `((fail assert-equal) ${Exps.formatExp(left)} ${Exps.formatExp(
          right,
        )})`,
      )
    }
  }
}
