import { cons, matchList, Rule, v } from "@cicada-lang/sexp"
import { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"
import { matchExp } from "../matchExp"

export function matchAssertNotEqual(): Array<Rule<Stmt>> {
  return [
    [
      cons("assert-not-equal", v("exps")),
      ({ exps }) => new Stmts.AssertNotEqual(matchList(exps, matchExp)),
    ],
  ]
}
