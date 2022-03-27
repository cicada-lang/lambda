import {
  match,
  matchList,
  matchString,
  matchSymbol,
} from "@cicada-lang/sexp/lib/match"
import { cons, list, v } from "@cicada-lang/sexp/lib/pattern-exp"
import { Sexp } from "@cicada-lang/sexp/lib/sexp"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Stmt } from "../stmt"
import * as Stmts from "../stmts"

export function matchStmt(sexp: Sexp): Stmt {
  return match<Stmt>(sexp, [
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
    [
      list(["import", v("url")], v("entries")),
      ({ url, entries }) =>
        new Stmts.ImportStmt(
          matchString(url),
          matchList(entries, matchImportEntry)
        ),
    ],
    [
      ["display-free-names", v("exp")],
      ({ exp }) => new Stmts.DisplayFreeNamesStmt(matchExp(exp)),
    ],
    [
      list(["assert-equal"], v("exps")),
      ({ exps }) => new Stmts.AssertEqualStmt(matchList(exps, matchExp)),
    ],
    [
      list(["assert-not-equal"], v("exps")),
      ({ exps }) => new Stmts.AssertNotEqualStmt(matchList(exps, matchExp)),
    ],
    [
      list(["comments"], v("exps")),
      ({ exps }) => new Stmts.CommentsStmt(matchList(exps, matchExp)),
    ],
    [v("exp"), ({ exp }) => new Stmts.EvaluateStmt(matchExp(exp))],
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

function matchExp(sexp: Sexp): Exp {
  return match<Exp>(sexp, [
    [
      ["lambda", v("names"), v("exp")],
      ({ names, exp }) => {
        let fn = matchExp(exp)
        for (const name of [...matchList(names, matchSymbol)].reverse()) {
          fn = new Exps.Fn(name, fn)
        }

        return fn
      },
    ],
    [
      cons(v("target"), v("args")),
      ({ target, args }) => {
        let result = matchExp(target)
        for (const arg of matchList(args, matchExp)) {
          result = new Exps.Ap(result, arg)
        }

        return result
      },
    ],
    [v("name"), ({ name }) => new Exps.Var(matchSymbol(name))],
  ])
}
