import { Env } from "../env"
import * as Exps from "../exps"
import { Mod } from "../mod"
import { Value } from "../value"

export function findBuiltinValue(
  mod: Mod,
  env: Env,
  name: string
): Value | undefined {
  if (name === "fix") {
    // NOTE (lambda (f) ((lambda (x) (f (x x))) (lambda (x) (f (x x)))))

    const half = new Exps.Fn(
      "x",
      new Exps.Ap(
        new Exps.Var("f"),
        new Exps.Ap(new Exps.Var("x"), new Exps.Var("x"))
      )
    )

    const Y = new Exps.Fn("f", new Exps.Ap(half, half))

    return Y.evaluate(mod, env)
  }

  return undefined
}
