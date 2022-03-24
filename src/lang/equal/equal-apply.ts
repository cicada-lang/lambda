import { LangError } from "../errors"
import * as Exps from "../exps"
import { Value } from "../value"

export function equalApply(target: Value, arg: Value): Value {
  if (target instanceof Exps.LazyValue || target instanceof Exps.ApThunkValue) {
    return equalApply(target.active(), arg)
  }

  if (target instanceof Exps.NotYetValue) {
    return new Exps.NotYetValue(new Exps.ApNeutral(target.neutral, arg))
  }

  if (target instanceof Exps.FnValue) {
    return target.ret.equalEvaluate(
      target.mod,
      target.env.extend(target.name, arg)
    )
  }

  throw new LangError(
    `I expect the target to be a function, instead of ${target.constructor.name}`
  )
}
