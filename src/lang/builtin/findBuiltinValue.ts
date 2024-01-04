import type { Env } from "../env/index.js"
import { evaluate } from "../evaluate/index.js"
import * as Exps from "../exp/index.js"
import type { Mod } from "../mod/index.js"
import type { Value } from "../value/index.js"

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

    return evaluate(mod, env, Y)
  }

  return undefined
}
