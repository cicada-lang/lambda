import { match } from "@cicada-lang/sexp/lib/match"
import { Sexp } from "@cicada-lang/sexp/lib/sexp"
import { Exp } from "../../exp"

export function matchExp(sexp: Sexp): Exp {
  return match(sexp, [
    ...require("./exps/fn").default(),
    // NOTE The keywords must be matched before `ap` and `var`.
    ...require("./exps/ap").default(),
    ...require("./exps/var").default(),
  ])
}
