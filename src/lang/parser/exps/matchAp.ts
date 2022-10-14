import { cons, matchList, Rule, v } from "@cicada-lang/sexp"
import { Exp } from "../../exp"
import * as Exps from "../../exps"
import { matchExp } from "../matchExp"

export function matchAp(): Array<Rule<Exp>> {
  return [
    [
      cons(v("target"), v("args")),
      ({ target, args }) =>
        matchList(args, matchExp).reduce(
          (result, arg) => new Exps.Ap(result, arg),
          matchExp(target),
        ),
    ],
  ]
}
