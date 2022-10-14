import { matchList, Rule } from "@cicada-lang/sexp/lib/match"
import { list, v } from "@cicada-lang/sexp/lib/pattern-exp"
import { Stmt } from "../../../stmt"
import * as Stmts from "../../../stmts"
import { matchExp } from "../../match"

export function matchComments(): Array<Rule<Stmt>> {
  return [
    [
      list(["comments"], v("exps")),
      ({ exps }) => new Stmts.CommentsStmt(matchList(exps, matchExp)),
    ],
  ]
}
