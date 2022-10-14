import { match, Sexp } from "@cicada-lang/sexp"
import { Stmt } from "../stmt"
import { matchAssertEqual } from "./stmts/matchAssertEqual"
import { matchAssertNotEqual } from "./stmts/matchAssertNotEqual"
import { matchComments } from "./stmts/matchComments"
import { matchDefine } from "./stmts/matchDefine"
import { matchDisplayFreeNames } from "./stmts/matchDisplayFreeNames"
import { matchEvaluate } from "./stmts/matchEvaluate"
import { matchImport } from "./stmts/matchImport"

export function matchStmt(sexp: Sexp): Stmt {
  return match(sexp, [
    ...matchDefine(),
    ...matchImport(),
    ...matchDisplayFreeNames(),
    ...matchAssertEqual(),
    ...matchAssertNotEqual(),
    ...matchComments(),
    ...matchEvaluate(),
  ])
}
