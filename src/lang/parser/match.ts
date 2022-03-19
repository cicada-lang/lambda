import { match, matchList } from "@cicada-lang/sexp/lib/match"
import { Sexp } from "@cicada-lang/sexp/lib/sexp"
import { Exp } from "../exp"
import { Stmt } from "../stmt"

export function matchStmt(sexp: Sexp): Stmt {
  return match<Stmt>(sexp, [
    // TODO
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
