import { evaluate } from "../evaluate"
import type * as Values from "../value"
import type { Value } from "../value"

export function lazyActive(lazy: Values.Lazy): Value {
  if (lazy.cache !== undefined) {
    return lazy.cache
  }

  const value = evaluate(lazy.mod, lazy.env, lazy.exp)
  lazy.cache = value
  return value
}
