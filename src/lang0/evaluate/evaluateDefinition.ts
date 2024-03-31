import { type Definition } from "../definition/index.js"
import { envEmpty } from "../env/index.js"
import { evaluate } from "../evaluate/index.js"
import { type Value } from "../value/index.js"

export function evaluateDefinition(definition: Definition): Value {
  if (definition.cache !== undefined) {
    return definition.cache
  }

  definition.cache = evaluate(definition.mod, envEmpty(), definition.exp)
  return definition.cache
}
