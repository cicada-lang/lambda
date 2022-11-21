import { evaluate } from "../evaluate"
import * as Exps from "../exp"
import type * as Values from "../value"
import type { Value } from "../value"

export function wrapFixpoint(value: Values.Fixpoint): Value {
  return evaluate(value.mod, value.env, Exps.Fn(value.name, value.body))
}
