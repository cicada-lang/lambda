import {
  match,
  matchList,
  matchString,
  matchSymbol,
  Rule,
} from "@cicada-lang/sexp/lib/match"
import { cons, v } from "@cicada-lang/sexp/lib/pattern-exp"
import { Sexp } from "@cicada-lang/sexp/lib/sexp"
import { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"

export function matchImport(): Array<Rule<Stmt>> {
  return [
    [
      cons("import", cons(v("url"), v("entries"))),
      ({ url, entries }) =>
        new Stmts.Import(
          matchString(url),
          matchList(entries, matchImportEntry)
        ),
    ],
  ]
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