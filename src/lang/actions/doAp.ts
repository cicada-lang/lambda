import * as Errors from "../errors"
import { Value } from "../value"

export function doAp(target: Value, arg: Value): Value {
  if (target.apply !== undefined) {
    return target.apply(arg)
  }

  throw new Errors.LangError(
    `I expect the target to be a function, instead of ${target.constructor.name}`,
  )
}
