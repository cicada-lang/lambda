import { Env } from "../env"
import { equalApply, EqualCtx } from "../equal"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Mod } from "../mod"

export function equalEvaluate(
  ctx: EqualCtx,
  left: { mod: Mod; env: Env; exp: Exp },
  right: { mod: Mod; env: Env; exp: Exp }
): boolean {
  if (left.exp instanceof Exps.Ap && right.exp instanceof Exps.Ap) {
    const leftTarget = left.exp.target.evaluate(left.mod, left.env)
    const leftArg = new Exps.LazyValue(left.mod, left.env, left.exp.arg)

    const rightTarget = right.exp.target.evaluate(right.mod, right.env)
    const rightArg = new Exps.LazyValue(right.mod, right.env, right.exp.arg)



    return equalApply(
      ctx,
      { target: leftTarget, arg: leftArg },
      { target: rightTarget, arg: rightArg }
    )
  }

  const leftValue = left.exp.evaluate(left.mod, left.env)
  const rightValue = right.exp.evaluate(right.mod, right.env)
  return leftValue.equal(ctx, rightValue)
}
