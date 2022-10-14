import { matchList, Rule } from "@cicada-lang/sexp/lib/match"
import { cons, v } from "@cicada-lang/sexp/lib/pattern-exp"
import { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"
import { matchExp } from "../matchExp"

export function matchComments(): Array<Rule<Stmt>> {
  return [
    [
      cons("comments", v("exps")),
      ({ exps }) => new Stmts.CommentsStmt(matchList(exps, matchExp)),
    ],
  ]
}
