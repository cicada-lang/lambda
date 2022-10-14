import { Rule } from "@cicada-lang/sexp/lib/match"
import { v } from "@cicada-lang/sexp/lib/pattern-exp"
import { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"
import { matchExp } from "../matchExp"

export function matchDisplayFreeNames(): Array<Rule<Stmt>> {
  return [
    [
      ["display-free-names", v("exp")],
      ({ exp }) => new Stmts.DisplayFreeNames(matchExp(exp)),
    ],
  ]
}
