import { matchList, matchSymbol, Rule } from "@cicada-lang/sexp/lib/match"
import { cons, v } from "@cicada-lang/sexp/lib/pattern-exp"
import * as Exps from "../../../exps"
import { Stmt } from "../../../stmt"
import * as Stmts from "../../../stmts"
import { matchExp } from "../../match"

export default function (): Array<Rule<Stmt>> {
  return [
    [
      ["define", cons(v("name"), v("args")), v("exp")],
      ({ name, args, exp }) => {
        let fn = matchExp(exp)
        for (const name of [...matchList(args, matchSymbol)].reverse()) {
          fn = new Exps.Fn(name, fn)
        }

        return new Stmts.DefineStmt(matchSymbol(name), fn)
      },
    ],

    [
      ["define", v("name"), v("exp")],
      ({ name, exp }) => new Stmts.DefineStmt(matchSymbol(name), matchExp(exp)),
    ],
  ]
}
