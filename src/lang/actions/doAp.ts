import * as Errors from "../errors"
import * as Exps from "../exp"
import * as Neutrals from "../neutral"
import * as Values from "../value"
import { Value } from "../value"

export function doAp(target: Value, arg: Value): Value {
  if (target instanceof Values.Fn) {
    return Exps.evaluate(
      target.mod,
      target.env.extend(target.name, arg),
      target.ret,
    )
  }

  if (target instanceof Values.Lazy) {
    return doAp(target.active(), arg)
  }

  if (target instanceof Values.Fixpoint) {
    if (arg instanceof Values.Lazy) {
      return doAp(target, arg.active())
    }

    if (arg instanceof Values.NotYet) {
      return doAp(target.eta(), arg)
    } else {
      const fix = Exps.evaluate(target.mod, target.env, Exps.Var("fix"))
      return doAp(doAp(fix, target.wrapper()), arg)
    }
  }

  if (target instanceof Values.NotYet) {
    return new Values.NotYet(Neutrals.Ap(target.neutral, arg))
  }

  throw new Errors.LangError(
    `I expect the target to be a function, instead of ${target.constructor.name}`,
  )
}
