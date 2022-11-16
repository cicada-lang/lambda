import { Env } from "../env"
import * as Exps from "../exp"
import { Mod } from "../mod"
import type { Value } from "../value"

export const builtinNames = ["fix"]

export function findBuiltinValue(
  mod: Mod,
  env: Env,
  name: string,
): Value | undefined {
  if (name === "fix") {
    // NOTE
    // (lambda (f)
    //  ((lambda (x) (f (x x)))
    //   (lambda (x) (f (x x)))))

    const half = Exps.Fn(
      "x",
      Exps.Ap(Exps.Var("f"), Exps.Ap(Exps.Var("x"), Exps.Var("x"))),
    )

    const Y = Exps.Fn("f", Exps.Ap(half, half))

    return Exps.evaluate(mod, env, Y)
  }

  return undefined
}
