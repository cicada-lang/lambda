import { matchList, Rule } from "@cicada-lang/sexp/lib/match"
import { cons, v } from "@cicada-lang/sexp/lib/pattern-exp"
import { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"
import { matchExp } from "../matchExp"

export function matchAssertEqual(): Array<Rule<Stmt>> {
  return [
    [
      cons("assert-equal", v("exps")),
      ({ exps }) => new Stmts.AssertEqualStmt(matchList(exps, matchExp)),
    ],
  ]
}
