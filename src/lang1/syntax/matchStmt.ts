import {
  cons,
  match,
  matchList,
  matchSymbol,
  v,
  type Sexp,
} from "@cicada-lang/sexp"
import * as Exps from "../exp/index.js"
import * as Stmts from "../stmt/index.js"
import { type Stmt } from "../stmt/index.js"
import { matchExp } from "./matchExp.js"

export function matchStmt(sexp: Sexp): Stmt {
  return match<Stmt>(sexp, [
    [
      ["define", cons(v("name"), v("args")), v("exp")],
      ({ name, args, exp }) =>
        Stmts.Define(
          matchSymbol(name),
          matchList(args, matchSymbol).reduceRight(
            (fn, name) => Exps.Fn(name, fn),
            matchExp(exp),
          ),
        ),
    ],

    [
      ["define", v("name"), v("exp")],
      ({ name, exp }) => Stmts.Define(matchSymbol(name), matchExp(exp)),
    ],

    [v("exp"), ({ exp }) => Stmts.Compute(matchExp(exp))],
  ])
}
