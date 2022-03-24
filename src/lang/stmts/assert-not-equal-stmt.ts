import { Env } from "../env"
import { EqualCtx } from "../equal"
import { AssertionError } from "../errors"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Stmt } from "../stmt"

export class AssertNotEqualStmt extends Stmt {
  constructor(public exps: Array<Exp>) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    for (let i = 0; i < this.exps.length - 1; i++) {
      this.assertNotEqual(mod, this.exps[i], this.exps[i + 1])
    }
  }

  private assertNotEqual(mod: Mod, left: Exp, right: Exp): void {
    const leftValue = left.evaluate(mod, Env.init())
    const rightValue = right.evaluate(mod, Env.init())
    if (leftValue.equal(EqualCtx.init(), rightValue)) {
      throw new AssertionError(
        `((fail assert-not-equal) ${left.format()} ${right.format()})`
      )
    }
  }
}
