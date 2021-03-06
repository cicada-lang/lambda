import { match } from "@cicada-lang/sexp/lib/match"
import { Sexp } from "@cicada-lang/sexp/lib/sexp"
import { Exp } from "../../exp"

export function matchExp(sexp: Sexp): Exp {
  return match<Exp>(sexp, [
    ...require("./exps/fn").default(),
    ...require("./exps/fixpoint").default(),
    // NOTE The keywords must be matched before `ap` and `var`.
    ...require("./exps/ap").default(),
    ...require("./exps/var").default(),
  ])
}
