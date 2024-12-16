import {
  cons,
  match,
  matchList,
  matchSymbol,
  v,
  type Sexp,
} from "../../sexp/index.ts"
import * as Exps from "../exp/index.ts"
import { type Exp } from "../exp/index.ts"
import {
  substitutionFromBindings,
  type Binding,
} from "../substitution/index.ts"

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
      ["let", v("bindings"), v("body")],
      ({ bindings, body }) =>
        Exps.Let(
          substitutionFromBindings(matchList(bindings, matchBinding)),
          matchExp(body),
        ),
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

export function matchBinding(sexp: Sexp): Binding {
  return match<Binding>(sexp, [
    [
      [v("name"), v("exp")],
      ({ name, exp }) => ({
        name: matchSymbol(name),
        exp: matchExp(exp),
      }),
    ],
  ])
}
