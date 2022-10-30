import { Env } from "../env"
import { EqualCtx } from "../equal"
import { AssertionError } from "../errors"
import * as Exps from "../exp"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Stmt } from "../stmt"

export class AssertNotEqual extends Stmt {
  constructor(public exps: Array<Exp>) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    for (let i = 0; i < this.exps.length - 1; i++) {
      this.assertNotEqual(mod, this.exps[i], this.exps[i + 1])
    }
  }

  async undo(mod: Mod): Promise<void> {}

  private assertNotEqual(mod: Mod, left: Exp, right: Exp): void {
    const leftValue = Exps.evaluate(mod, Env.init(), left)
    const rightValue = Exps.evaluate(mod, Env.init(), right)
    if (leftValue.equal(EqualCtx.init(), rightValue)) {
      throw new AssertionError(
        `((fail assert-not-equal) ${Exps.formatExp(left)} ${Exps.formatExp(
          right,
        )})`,
      )
    }
  }
}
