import { evaluate } from "../evaluate/index.js"
import * as Exps from "../exp/index.js"
import type * as Values from "../value/index.js"
import { type Value } from "../value/index.js"

export function fixpointWrap(value: Values.Fixpoint): Value {
  return evaluate(value.mod, value.env, Exps.Fn(value.name, value.body))
}
