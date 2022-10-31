import * as Exps from "../exp"
import * as Values from "../value"
import { Value } from "../value"

export function wrapFixpoint(value: Values.Fixpoint): Value {
  return Exps.evaluate(value.mod, value.env, Exps.Fn(value.name, value.body))
}
