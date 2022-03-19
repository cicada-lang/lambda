import { match, matchList, matchSymbol } from "@cicada-lang/sexp/lib/match"
import { cons, v } from "@cicada-lang/sexp/lib/pattern-exp"
import { Sexp } from "@cicada-lang/sexp/lib/sexp"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Stmt } from "../stmt"
import * as Stmts from "../stmts"

export function matchStmt(sexp: Sexp): Stmt {
  return match<Stmt>(sexp, [
    [
      ["define", v("name"), v("exp")],
      ({ name, exp }) =>
        new Stmts.DefineStmt(matchSymbol(name), matchExp(exp), sexp.span),
    ],
    [v("exp"), ({ exp }) => new Stmts.ExpStmt(matchExp(exp), sexp.span)],
  ])
}

function matchExps(sexp: Sexp): Array<Exp> {
  return matchList(sexp, matchExp)
}

function matchExp(sexp: Sexp): Exp {
  return match<Exp>(sexp, [
    [v("name"), ({ name }) => new Exps.Var(matchSymbol(name), sexp.span)],
    [
      cons(v("target"), v("args")),
      ({ target, args }) => {
        let result = matchExp(target)
        for (const arg of matchList(args, matchExp)) {
          result = new Exps.Ap(result, arg, sexp.span)
        }

        return result
      },
    ],
    [
      ["lambda", v("names"), v("exp")],
      ({ names, exp }) => {
        let fn: Exp = matchExp(exp)
        for (const name of [...matchList(names, matchSymbol)].reverse()) {
          fn = new Exps.Fn(name, fn, sexp.span)
        }

        return fn
      },
    ],
  ])
}
