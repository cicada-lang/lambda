import {
  cons,
  match,
  matchList,
  matchSymbol,
  v,
  type Sexp,
} from "@cicada-lang/sexp"
import { type Stmt } from "../stmt/index.js"
import { matchExp } from "./matchExp.js"

export function matchStmt(sexp: Sexp): Stmt {
  return match<Stmt>(sexp, [
    [
      ["define", cons(v("name"), v("args")), v("exp")],
      ({ name, args, exp }) => ({
        "@type": "Stmt",
        "@kind": "Define",
        name: matchSymbol(name),
        exp: matchList(args, matchSymbol).reduceRight(
          (fn, name) => ({
            "@type": "Exp",
            "@kind": "Fn",
            name,
            ret: fn,
          }),
          matchExp(exp),
        ),
      }),
    ],

    [
      ["define", v("name"), v("exp")],
      ({ name, exp }) => ({
        "@type": "Stmt",
        "@kind": "Define",
        name: matchSymbol(name),
        exp: matchExp(exp),
      }),
    ],

    [
      v("exp"),
      ({ exp }) => ({
        "@type": "Stmt",
        "@kind": "Compute",
        exp: matchExp(exp),
      }),
    ],
  ])
}
