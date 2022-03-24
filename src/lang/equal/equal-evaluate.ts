import { Env } from "../env"
import { EqualCtx, equalApply } from "../equal"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { apply } from "../apply"
import * as Exps from "../exps"

export function equalEvaluate(
  ctx: EqualCtx,
  left: { mod: Mod; env: Env; exp: Exp },
  right: { mod: Mod; env: Env; exp: Exp }
): boolean {
  if (left.exp instanceof Exps.Ap && right.exp instanceof Exps.Ap) {
    return equalApply(
      ctx,
      {
        target: left.exp.target.evaluate(left.mod, left.env),
        arg: new Exps.LazyValue(left.mod, left.env, left.exp.arg),
      },
      {
        target: right.exp.target.evaluate(right.mod, right.env),
        arg: new Exps.LazyValue(right.mod, right.env, right.exp.arg),
      }
    )
  }

  const leftValue = left.exp.evaluate(left.mod, left.env)
  const rightValue = right.exp.evaluate(right.mod, right.env)
  return leftValue.equal(ctx, rightValue)
}
