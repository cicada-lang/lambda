import { cons, matchList, Rule, v } from "@cicada-lang/sexp"
import { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"
import { matchExp } from "../matchExp"

export function matchComments(): Array<Rule<Stmt>> {
  return [
    [
      cons("comments", v("exps")),
      ({ exps }) => new Stmts.Comments(matchList(exps, matchExp)),
    ],
  ]
}
