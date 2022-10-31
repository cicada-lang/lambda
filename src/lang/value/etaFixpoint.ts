import * as Exps from "../exp"
import * as Neutrals from "../neutral"
import * as Values from "../value"
import { Value } from "../value"

export function etaFixpoint(value: Values.Fixpoint): Value {
  return Exps.evaluate(
    value.mod,
    value.env.extend("f", Values.NotYet(Neutrals.Fixpoint(value))),
    Exps.Fn("x", Exps.Ap(Exps.Var("f"), Exps.Var("x"))),
  )
}
