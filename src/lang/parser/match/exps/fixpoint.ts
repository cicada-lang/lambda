import { matchSymbol, Rule } from "@cicada-lang/sexp/lib/match"
import { v } from "@cicada-lang/sexp/lib/pattern-exp"
import { Exp } from "../../../exp"
import * as Exps from "../../../exps"
import { matchExp } from "../../match"

export default function (): Array<Rule<Exp>> {
  return [
    [
      ["fixpoint", v("name"), v("exp")],
      ({ name, exp }) => new Exps.Fixpoint(matchSymbol(name), matchExp(exp)),
    ],
  ]
}
