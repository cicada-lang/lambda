import { Env } from "../env"
import { AssertionError } from "../errors"
import * as Exps from "../exp"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Stmt } from "../stmt"
import * as Values from "../value"
import { EqualCtx } from "../value"

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
    const leftValue = Exps.evaluate(mod, Env.init(), left)
    const rightValue = Exps.evaluate(mod, Env.init(), right)
    if (!Values.equal(EqualCtx.init(), leftValue, rightValue)) {
      throw new AssertionError(
        `((fail assert-equal) ${Exps.formatExp(left)} ${Exps.formatExp(
          right,
        )})`,
      )
    }
  }
}
