import { type Definition } from "../definition/index.ts"
import { envEmpty } from "../env/index.ts"
import { evaluate } from "../evaluate/index.ts"
import { type Value } from "../value/index.ts"

export function evaluateDefinition(definition: Definition): Value {
  if (definition.cache !== undefined) {
    return definition.cache
  }

  definition.cache = evaluate(definition.mod, envEmpty(), definition.exp)
  return definition.cache
}
