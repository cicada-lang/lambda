import * as Exps from "../exp"
import * as Values from "../value"
import { Value } from "../value"

export function activeLazy(lazy: Values.Lazy): Value {
  if (lazy.cache !== undefined) {
    return lazy.cache
  }

  const value = Exps.evaluate(lazy.mod, lazy.env, lazy.exp)
  lazy.cache = value
  return value
}
