import { LangError } from "../errors"
import { Value } from "../value"

export function apply(target: Value, arg: Value): Value {
  if (target.apply !== undefined) {
    return target.apply(arg)
  }

  throw new LangError(
    `I expect the target to be a function, instead of ${target.constructor.name}`,
  )
}
