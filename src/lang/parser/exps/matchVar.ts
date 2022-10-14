import { matchSymbol, Rule, v } from "@cicada-lang/sexp"
import { Exp } from "../../exp"
import * as Exps from "../../exps"

export function matchVar(): Array<Rule<Exp>> {
  return [[v("name"), ({ name }) => new Exps.Var(matchSymbol(name))]]
}
