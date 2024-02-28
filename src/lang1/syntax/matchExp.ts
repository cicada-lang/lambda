import {
  cons,
  match,
  matchList,
  matchSymbol,
  v,
  type Sexp,
} from "@cicada-lang/sexp"
import { type Exp } from "../exp/index.js"

export function matchExp(sexp: Sexp): Exp {
  return match<Exp>(sexp, [
    [
      ["lambda", v("names"), v("exp")],
      ({ names, exp }) =>
        matchList(names, matchSymbol).reduceRight(
          (fn, name) => ({
            "@type": "Exp",
            "@kind": "Fn",
            name,
            ret: fn,
          }),
          matchExp(exp),
        ),
    ],

    [
      cons(v("target"), v("args")),
      ({ target, args }) =>
        matchList(args, matchExp).reduce(
          (result, arg) => ({
            "@type": "Exp",
            "@kind": "Ap",
            target: result,
            arg,
          }),
          matchExp(target),
        ),
    ],

    [
      v("name"),
      ({ name }) => ({
        "@type": "Exp",
        "@kind": "Var",
        name: matchSymbol(name),
      }),
    ],
  ])
}
