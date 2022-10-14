import { Rule, v } from "@cicada-lang/sexp"
import { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"
import { matchExp } from "../matchExp"

export function matchEvaluate(): Array<Rule<Stmt>> {
  return [[v("exp"), ({ exp }) => new Stmts.Compute(matchExp(exp))]]
}
