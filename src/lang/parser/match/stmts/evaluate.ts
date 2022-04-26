import { Rule } from "@cicada-lang/sexp/lib/match"
import { v } from "@cicada-lang/sexp/lib/pattern-exp"
import { Stmt } from "../../../stmt"
import * as Stmts from "../../../stmts"
import { matchExp } from "../../match"

export default function (): Array<Rule<Stmt>> {
  return [[v("exp"), ({ exp }) => new Stmts.ComputeStmt(matchExp(exp))]]
}
