import assert from "node:assert"
import { test } from "node:test"
import { ParsingError } from "../errors/index.ts"
import { Parser } from "../parser/index.ts"
import {
  cons,
  evaluate,
  list,
  str,
  v,
  type PatternExp,
} from "../pattern-exp/index.ts"
import { matchPatternOrFail } from "../pattern/index.ts"
import { type Sexp } from "../sexp/index.ts"

const parser = new Parser({
  quotes: [
    { mark: "'", symbol: "quote" },
    { mark: ",", symbol: "unquote" },
    { mark: "`", symbol: "quasiquote" },
  ],
  parentheses: [
    { start: "(", end: ")" },
    { start: "[", end: "]" },
  ],
  comments: [";", "//"],
  nulls: ["null", "nil"],
})

function assertSexps(
  text: string,
  exps: Array<PatternExp>,
): Array<Record<string, Sexp>> {
  try {
    const sexps = parser.parseSexps(text)
    if (sexps.length !== exps.length) {
      throw new Error(
        `Length mismatch, sexps: ${sexps.length}, exps: ${exps.length}`,
      )
    }

    return sexps.map((sexp, i) => matchPatternOrFail(evaluate(exps[i]), sexp))
  } catch (error) {
    if (error instanceof ParsingError) {
      const report = error.span.report(text)
      console.log(report)
    }

    throw error
  }
}

function assertSexp(text: string, exp: PatternExp): Record<string, Sexp> {
  try {
    const sexp = parser.parseSexp(text)
    return matchPatternOrFail(evaluate(exp), sexp)
  } catch (error) {
    if (error instanceof ParsingError) {
      const report = error.span.report(text)
      console.log(report)
    }

    throw error
  }
}

test("symbol", () => {
  assertSexp("abc", "abc")
  assertSexp("3-sphere", "3-sphere")
})

test("string", () => {
  assertSexp('"abc"', str("abc"))
})

test("number", () => {
  assertSexp("1", 1)
  assertSexp("0", 0)
  assertSexp("-1", -1)
  assertSexp("3.14", 3.14)
})

test("list", () => {
  assertSexp("()", [])
  assertSexp("(a b c)", ["a", "b", "c"])
  assertSexp("[]", [])
  assertSexp("[a b c]", ["a", "b", "c"])
})

test("null", () => {
  assertSexp("null", [])
  assertSexp("nil", [])
})

test("non proper list", () => {
  assertSexp("(a . d)", cons("a", "d"))
  assertSexp("(a . d)", list(["a"], "d"))
  assertSexp("(a b c . d)", list(["a", "b", "c"], "d"))
})

test("quotes", () => {
  assertSexp("'a", ["quote", "a"])
  assertSexp("'(a)", ["quote", ["a"]])
  assertSexp("'(a b c)", ["quote", ["a", "b", "c"]])
  assertSexp(",(a b c)", ["unquote", ["a", "b", "c"]])
  assertSexp("`(a ,b c)", ["quasiquote", ["a", ["unquote", "b"], "c"]])
})

test("variable in pattern", () => {
  const results = assertSexp("(a b c)", ["a", v("x"), "c"])
  assert.deepStrictEqual((results["x"] as any).value, "b")
})

test("many sexps", () => {
  const results = assertSexps(
    [
      //
      "a",
      "(a b c)",
      "'(a b c)",
      "(a b c . d)",
    ].join("\n"),
    [
      "a",
      ["a", "b", "c"],
      ["quote", ["a", "b", "c"]],
      list(["a", "b", "c"], "d"),
    ],
  )
})
