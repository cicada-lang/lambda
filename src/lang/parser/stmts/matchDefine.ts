import { cons, matchList, matchSymbol, Rule, v } from "@cicada-lang/sexp"
import * as Exps from "../../exps"
import { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"
import { matchExp } from "../matchExp"

export function matchDefine(): Array<Rule<Stmt>> {
  return [
    [
      ["define", cons(v("name"), v("args")), v("exp")],
      ({ name, args, exp }) =>
        new Stmts.Define(
          matchSymbol(name),
          matchList(args, matchSymbol).reduceRight(
            (fn, name) => new Exps.Fn(name, fn),
            matchExp(exp),
          ),
        ),
    ],
    [
      ["define", v("name"), v("exp")],
      ({ name, exp }) => new Stmts.Define(matchSymbol(name), matchExp(exp)),
    ],
  ]
}
