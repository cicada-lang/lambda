import { type Definition } from "../definition/index.js"
import { Env } from "../env/index.js"
import { evaluate } from "../evaluate/index.js"
import { type Value } from "../value/index.js"

export function evaluateDefinition(definition: Definition): Value {
  if (definition.cache !== undefined) {
    return definition.cache
  }

  definition.cache = evaluate(definition.mod, Env.init(), definition.exp)
  return definition.cache
}
