import { matchSymbol, Rule } from "@cicada-lang/sexp/lib/match"
import { v } from "@cicada-lang/sexp/lib/pattern-exp"
import { Exp } from "../../../exp"
import * as Exps from "../../../exps"

export default function (): Array<Rule<Exp>> {
  return [[v("name"), ({ name }) => new Exps.Var(matchSymbol(name))]]
}
