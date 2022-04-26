import { match } from "@cicada-lang/sexp/lib/match"
import { Sexp } from "@cicada-lang/sexp/lib/sexp"
import { Stmt } from "../../stmt"

export function matchStmt(sexp: Sexp): Stmt {
  return match(sexp, [
    ...require("./stmts/claim").default(),
    ...require("./stmts/define").default(),
    ...require("./stmts/define-class").default(),
    ...require("./stmts/import").default(),
    ...require("./stmts/display-free-names").default(),
    ...require("./stmts/assert-equal").default(),
    ...require("./stmts/assert-not-equal").default(),
    ...require("./stmts/comments").default(),
    ...require("./stmts/evaluate").default(),
  ])
}
