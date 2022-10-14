import { matchSymbol, Rule, v } from "@cicada-lang/sexp"
import { Exp } from "../../exp"
import * as Exps from "../../exps"
import { matchExp } from "../matchExp"

export function matchFixpoint(): Array<Rule<Exp>> {
  return [
    [
      ["fixpoint", v("name"), v("exp")],
      ({ name, exp }) => new Exps.Fixpoint(matchSymbol(name), matchExp(exp)),
    ],
  ]
}
