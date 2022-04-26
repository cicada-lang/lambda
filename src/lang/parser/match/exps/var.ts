import { matchList, Rule } from "@cicada-lang/sexp/lib/match"
import { cons, v } from "@cicada-lang/sexp/lib/pattern-exp"
import { Exp } from "../../../exp"
import * as Exps from "../../../exps"
import { matchExp } from "../../match"

export default function (): Array<Rule<Exp>> {
  return [
    [
      cons(v("target"), v("args")),
      ({ target, args }) => {
        let result = matchExp(target)
        for (const arg of matchList(args, matchExp)) {
          result = new Exps.Ap(result, arg)
        }

        return result
      },
    ],
  ]
}
