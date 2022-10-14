import { matchList, Rule } from "@cicada-lang/sexp/lib/match"
import { list, v } from "@cicada-lang/sexp/lib/pattern-exp"
import { Stmt } from "../../../stmt"
import * as Stmts from "../../../stmts"
import { matchExp } from "../../match"

export function matchAssertNotEqual (): Array<Rule<Stmt>> {
  return [
    [
      list(["assert-not-equal"], v("exps")),
      ({ exps }) => new Stmts.AssertNotEqualStmt(matchList(exps, matchExp)),
    ],
  ]
}
