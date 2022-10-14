import { match } from "@cicada-lang/sexp/lib/match"
import { Sexp } from "@cicada-lang/sexp/lib/sexp"
import { Exp } from "../../exp"
import { matchAp } from "./exps/matchAp"
import { matchFixpoint } from "./exps/matchFixpoint"
import { matchFn } from "./exps/matchFn"
import { matchVar } from "./exps/matchVar"

export function matchExp(sexp: Sexp): Exp {
  return match<Exp>(sexp, [
    ...matchFn(),
    ...matchFixpoint(),
    // NOTE The keywords must be matched before `ap` and `var`.
    ...matchAp(),
    ...matchVar(),
  ])
}
