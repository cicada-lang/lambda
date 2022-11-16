import * as Exps from "../exp"
import type { Value } from "../value"
import * as Values from "../value"

export function wrapFixpoint(value: Values.Fixpoint): Value {
  return Exps.evaluate(value.mod, value.env, Exps.Fn(value.name, value.body))
}
