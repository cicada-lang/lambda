import {
  cons,
  match,
  matchList,
  matchSymbol,
  v,
  type Sexp,
} from "@cicada-lang/sexp"
import { type Stmt } from "../stmt/index.js"
import * as Stmts from "../stmts/index.js"
import { matchExp } from "./matchExp.js"

export function matchStmt(sexp: Sexp): Stmt {
  return match<Stmt>(sexp, [
    [
      ["define", cons(v("name"), v("args")), v("exp")],
      ({ name, args, exp }) =>
        new Stmts.Define(
          matchSymbol(name),
          matchList(args, matchSymbol).reduceRight(
            (fn, name) => ({
              "@type": "Exp",
              "@kind": "Fn",
              name,
              ret: fn,
            }),
            matchExp(exp),
          ),
        ),
    ],

    [
      ["define", v("name"), v("exp")],
      ({ name, exp }) => new Stmts.Define(matchSymbol(name), matchExp(exp)),
    ],

    [v("exp"), ({ exp }) => new Stmts.Compute(matchExp(exp))],
  ])
}
