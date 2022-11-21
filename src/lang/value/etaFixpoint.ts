import { evaluate } from "../evaluate"
import * as Exps from "../exp"
import * as Neutrals from "../neutral"
import type { Value } from "../value"
import * as Values from "../value"

export function etaFixpoint(value: Values.Fixpoint): Value {
  return evaluate(
    value.mod,
    value.env.extend("f", Values.NotYet(Neutrals.Fixpoint(value))),
    Exps.Fn("x", Exps.Ap(Exps.Var("f"), Exps.Var("x"))),
  )
}
