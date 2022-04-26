import { matchList, matchSymbol, Rule } from "@cicada-lang/sexp/lib/match"
import { v } from "@cicada-lang/sexp/lib/pattern-exp"
import { Exp } from "../../../exp"
import * as Exps from "../../../exps"
import { matchExp } from "../../match"

export default function (): Array<Rule<Exp>> {
  return [
    [
      ["lambda", v("names"), v("exp")],
      ({ names, exp }) => {
        let fn = matchExp(exp)
        for (const name of [...matchList(names, matchSymbol)].reverse()) {
          fn = new Exps.Fn(name, fn)
        }

        return fn
      },
    ],
  ]
}
