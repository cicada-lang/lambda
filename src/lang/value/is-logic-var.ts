import * as Exps from "../exps"
import { Value } from "../value"

export function isLogicVar(value: Value): boolean {
  return (
    value instanceof Exps.NotYetValue &&
    value.neutral instanceof Exps.VarNeutral
  )
}
