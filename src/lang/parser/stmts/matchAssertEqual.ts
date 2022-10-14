import { cons, matchList, Rule, v } from "@cicada-lang/sexp"
import { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"
import { matchExp } from "../matchExp"

export function matchAssertEqual(): Array<Rule<Stmt>> {
  return [
    [
      cons("assert-equal", v("exps")),
      ({ exps }) => new Stmts.AssertEqual(matchList(exps, matchExp)),
    ],
  ]
}
