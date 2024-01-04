import { evaluate } from "../evaluate/index.js"
import * as Exps from "../exp/index.js"
import * as Neutrals from "../neutral/index.js"
import type { Value } from "../value/index.js"
import * as Values from "../value/index.js"

export function fixpointEta(value: Values.Fixpoint): Value {
  return evaluate(
    value.mod,
    value.env.extend("f", Values.NotYet(Neutrals.Fixpoint(value))),
    Exps.Fn("x", Exps.Ap(Exps.Var("f"), Exps.Var("x"))),
  )
}
