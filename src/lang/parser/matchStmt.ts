import {
  cons,
  match,
  matchList,
  matchString,
  matchSymbol,
  Sexp,
  v,
} from "@cicada-lang/sexp"
import * as Exps from "../exp"
import { Stmt } from "../stmt"
import * as Stmts from "../stmts"
import { matchExp } from "./matchExp"

export function matchStmt(sexp: Sexp): Stmt {
  return match<Stmt>(sexp, [
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
    [
      cons("import", cons(v("url"), v("entries"))),
      ({ url, entries }) =>
        new Stmts.Import(
          matchString(url),
          matchList(entries, matchImportEntry),
        ),
    ],
    [
      ["display-free-names", v("exp")],
      ({ exp }) => new Stmts.DisplayFreeNames(matchExp(exp)),
    ],
    [
      cons("assert-equal", v("exps")),
      ({ exps }) => new Stmts.AssertEqual(matchList(exps, matchExp)),
    ],
    [
      cons("assert-not-equal", v("exps")),
      ({ exps }) => new Stmts.AssertNotEqual(matchList(exps, matchExp)),
    ],
    [
      cons("comments", v("exps")),
      ({ exps }) => new Stmts.Comments(matchList(exps, matchExp)),
    ],
    [v("exp"), ({ exp }) => new Stmts.Compute(matchExp(exp))],
  ])
}

function matchImportEntry(sexp: Sexp): Stmts.ImportEntry {
  return match<Stmts.ImportEntry>(sexp, [
    [
      ["rename", v("name"), v("rename")],
      ({ name, rename }) => ({
        name: matchSymbol(name),
        rename: matchSymbol(rename),
      }),
    ],
    [v("name"), ({ name }) => ({ name: matchSymbol(name) })],
  ])
}
