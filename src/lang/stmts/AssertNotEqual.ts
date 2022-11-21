import { Env } from "../env"
import { AssertionError } from "../errors"
import { evaluate } from "../evaluate"
import type { Exp } from "../exp"
import * as Exps from "../exp"
import type { Mod } from "../mod"
import { Stmt } from "../stmt"
import * as Values from "../value"
import { EqualCtx } from "../value"

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
    const leftValue = evaluate(mod, Env.init(), left)
    const rightValue = evaluate(mod, Env.init(), right)
    if (Values.equal(EqualCtx.init(), leftValue, rightValue)) {
      throw new AssertionError(
        `((fail assert-not-equal) ${Exps.formatExp(left)} ${Exps.formatExp(
          right,
        )})`,
      )
    }
  }
}
