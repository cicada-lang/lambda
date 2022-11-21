import { cons, match, matchList, matchSymbol, Sexp, v } from "@cicada-lang/sexp"
import type { Exp } from "../exp"
import * as Exps from "../exp"

export function matchExp(sexp: Sexp): Exp {
  return match<Exp>(sexp, [
    [
      ["lambda", v("names"), v("exp")],
      ({ names, exp }) =>
        matchList(names, matchSymbol).reduceRight(
          (fn, name) => Exps.Fn(name, fn),
          matchExp(exp),
        ),
    ],
    [
      ["fixpoint", v("name"), v("exp")],
      ({ name, exp }) => Exps.Fixpoint(matchSymbol(name), matchExp(exp)),
    ],
    [
      cons(v("target"), v("args")),
      ({ target, args }) =>
        matchList(args, matchExp).reduce(
          (result, arg) => Exps.Ap(result, arg),
          matchExp(target),
        ),
    ],
    [v("name"), ({ name }) => Exps.Var(matchSymbol(name))],
  ])
}
