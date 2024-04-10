import { evaluate } from "../evaluate/index.js"
import type * as Values from "../value/index.js"
import { type Value } from "../value/index.js"

export function lazyActive(lazy: Values.Lazy): Value {
  if (lazy.cache !== undefined) {
    return lazy.cache
  }

  const value = evaluate(lazy.mod, lazy.env, lazy.exp)
  lazy.cache = value
  return value
}

export function lazyActiveDeep(value: Value): Value {
  if (value["@kind"] === "Lazy") {
    return lazyActiveDeep(lazyActive(value))
  }

  return value
}
