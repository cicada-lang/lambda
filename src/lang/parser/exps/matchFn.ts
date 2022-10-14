import { matchList, matchSymbol, Rule, v } from "@cicada-lang/sexp"
import { Exp } from "../../exp"
import * as Exps from "../../exps"
import { matchExp } from "../matchExp"

export function matchFn(): Array<Rule<Exp>> {
  return [
    [
      ["lambda", v("names"), v("exp")],
      ({ names, exp }) =>
        matchList(names, matchSymbol).reduceRight(
          (fn, name) => new Exps.Fn(name, fn),
          matchExp(exp),
        ),
    ],
  ]
}
