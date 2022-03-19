import { match, matchList, matchSymbol } from "@cicada-lang/sexp/lib/match"
import { v } from "@cicada-lang/sexp/lib/pattern-exp"
import { Sexp } from "@cicada-lang/sexp/lib/sexp"
import { Exp } from "../exp"
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
    // TODO
  ])
}
