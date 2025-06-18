import assert from "node:assert"
import { test } from "node:test"
import { Lexer } from "../lexer/index.ts"
import { Token } from "../token/index.ts"

const lexer = new Lexer({
  quotes: [
    { mark: "'", symbol: "quote" },
    { mark: ",", symbol: "unquote" },
    { mark: "`", symbol: "quasiquote" },
  ],
  brackets: [
    { start: "(", end: ")" },
    { start: "[", end: "]" },
    { start: "{", end: "}" },
  ],
  comments: [";", "//"],
  nulls: ["null"],
})

function assertTokens(text: string, tokens: Array<Omit<Token, "span">>): void {
  const results = lexer.lex(text).map(({ kind, value }) => ({ kind, value }))
  assert.deepStrictEqual(results, tokens)
}

test("blank", () => {
  assertTokens("", [])
  assertTokens("\n", [])
  assertTokens(" \n ", [])
  assertTokens(" \n \t ", [])
  assertTokens("    ", [])
})

test("symbol", () => {
  assertTokens("a b c", [
    { kind: "Symbol", value: "a" },
    { kind: "Symbol", value: "b" },
    { kind: "Symbol", value: "c" },
  ])

  assertTokens("abc", [{ kind: "Symbol", value: "abc" }])

  assertTokens("3-sphere", [{ kind: "Symbol", value: "3-sphere" }])
})

test("quotes", () => {
  assertTokens("'a", [
    { kind: "Quote", value: "'" },
    { kind: "Symbol", value: "a" },
  ])

  assertTokens("'  a", [
    { kind: "Quote", value: "'" },
    { kind: "Symbol", value: "a" },
  ])
})

test("brackets", () => {
  assertTokens("()", [
    { kind: "BracketStart", value: "(" },
    { kind: "BracketEnd", value: ")" },
  ])

  assertTokens("( )", [
    { kind: "BracketStart", value: "(" },
    { kind: "BracketEnd", value: ")" },
  ])

  assertTokens("(a)(b)", [
    { kind: "BracketStart", value: "(" },
    { kind: "Symbol", value: "a" },
    { kind: "BracketEnd", value: ")" },
    { kind: "BracketStart", value: "(" },
    { kind: "Symbol", value: "b" },
    { kind: "BracketEnd", value: ")" },
  ])

  assertTokens("([{x}])", [
    { kind: "BracketStart", value: "(" },
    { kind: "BracketStart", value: "[" },
    { kind: "BracketStart", value: "{" },
    { kind: "Symbol", value: "x" },
    { kind: "BracketEnd", value: "}" },
    { kind: "BracketEnd", value: "]" },
    { kind: "BracketEnd", value: ")" },
  ])

  assertTokens("(head . tail)", [
    { kind: "BracketStart", value: "(" },
    { kind: "Symbol", value: "head" },
    { kind: "Symbol", value: "." },
    { kind: "Symbol", value: "tail" },
    { kind: "BracketEnd", value: ")" },
  ])

  assertTokens("abc", [{ kind: "Symbol", value: "abc" }])
})

test("comments", () => {
  assertTokens("; abc", [])
  assertTokens("; abc\n", [])
  assertTokens("; abc\nabc", [{ kind: "Symbol", value: "abc" }])

  assertTokens("// abc", [])
  assertTokens("// abc\n", [])
  assertTokens("// abc\nabc", [{ kind: "Symbol", value: "abc" }])
})

test("string", () => {
  assertTokens('"abc"', [{ kind: "String", value: '"abc"' }])

  assertTokens('"abc" "abc"', [
    { kind: "String", value: '"abc"' },
    { kind: "String", value: '"abc"' },
  ])

  assertTokens('"abc""abc"', [
    { kind: "String", value: '"abc"' },
    { kind: "String", value: '"abc"' },
  ])

  assertTokens('"//"', [{ kind: "String", value: '"//"' }])
})

test("number", () => {
  assertTokens("1", [{ kind: "Number", value: "1" }])
  assertTokens("-1", [{ kind: "Number", value: "-1" }])

  assertTokens("3.14 3.14", [
    { kind: "Number", value: "3.14" },
    { kind: "Number", value: "3.14" },
  ])
})
