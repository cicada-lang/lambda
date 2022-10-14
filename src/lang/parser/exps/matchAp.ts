import { matchList, Rule } from "@cicada-lang/sexp/lib/match"
import { cons, v } from "@cicada-lang/sexp/lib/pattern-exp"
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
          matchExp(target)
        ),
    ],
  ]
}
