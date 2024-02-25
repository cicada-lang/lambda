import { Env } from "../env/index.js"
import { evaluate } from "../evaluate/index.js"
import * as Exps from "../exp/index.js"
import { type Exp } from "../exp/index.js"
import { type Value } from "../value/index.js"
import { type Definition } from "./index.js"

export function evaluateDefinition(definition: Definition): Value {
  if (definition.cache !== undefined) {
    return definition.cache
  }

  const exp = buildExp(definition)
  definition.cache = evaluate(definition.mod, Env.init(), exp)
  return definition.cache
}

function buildExp(definition: Definition): Exp {
  if (isRecursive(definition)) {
    return Exps.Fixpoint(definition.name, definition.exp)
  }

  return definition.exp
}

function isRecursive(definition: Definition): boolean {
  const freeNames = Exps.freeNames(new Set(), definition.exp)
  return freeNames.has(definition.name)
}
