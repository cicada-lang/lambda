import * as Exps from "../exps"
import { Value } from "../value"

export function isLogicVar(value: Value): boolean {
  if (value instanceof Exps.LazyValue) {
    return isLogicVar(value.active())
  } else {
    return (
      value instanceof Exps.NotYetValue &&
      value.neutral instanceof Exps.VarNeutral
    )
  }
}
