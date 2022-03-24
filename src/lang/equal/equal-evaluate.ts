import { Env } from "../env"
import { EqualCtx } from "../equal"
import { Exp } from "../exp"
import { Mod } from "../mod"

export function equalEvaluate(
  ctx: EqualCtx,
  left: { mod: Mod; env: Env; exp: Exp },
  right: { mod: Mod; env: Env; exp: Exp }
): boolean {
  const leftValue = left.exp.evaluate(left.mod, left.env)
  const rightValue = right.exp.evaluate(right.mod, right.env)
  return leftValue.equal(ctx, rightValue)
}
