import assert from "node:assert"
import { test } from "node:test"
import { createLexer } from "./Lexer.js"
import { type ParserResult, type Token } from "./index.js"

type Sexp = string | Array<Sexp>

function parseSexp(tokens: Array<Token>): ParserResult<Sexp> {
  try {
    return parseSymbol(tokens)
  } catch (_) {
    return parseList(tokens)
  }
}

function parseSymbol(tokens: Array<Token>): ParserResult<string> {
  const [token] = tokens
  if (token === undefined) {
    throw new Error("[parseSymbol]")
  }

  if (token.label !== "identifier") {
    throw new Error("[parseSymbol]")
  }

  return [token.value, tokens.slice(1)]
}

function parseList(tokens: Array<Token>): ParserResult<Array<Sexp>> {
  const token = tokens[0]
  if (token === undefined) {
    throw new Error("[parseList] 1")
  }

  if (token.label !== "symbol" || token.value !== "(") {
    throw new Error("[parseList] 2")
  }

  tokens = tokens.slice(1)
  const list: Array<Sexp> = []
  while (true) {
    const token = tokens[0]
    if (token === undefined) {
      throw new Error("[parseList] 3")
    }

    if (token.label === "symbol" && token.value === ")") {
      return [list, tokens.slice(1)]
    }

    const [sexp, remain] = parseSexp(tokens)
    tokens = remain
    list.push(sexp)
  }
}

const lexer = createLexer({
  identifier: /^\s*([_\p{Letter}][_\p{Letter}0-9]*)\s*/u,
  string: /^\s*("(\\.|[^"])*")\s*/,
  number: /^\s*(\d+\.\d+|\d+|-\d+\.\d+|-\d+)\s*/,
  symbol: /^\s*([^_\p{Letter}0-9\s])\s*/u,
})

test("Parser", () => {
  {
    const tokens = lexer("a")
    assert.deepStrictEqual(parseSexp(tokens), ["a", []])
  }

  {
    const tokens = lexer("(a)")
    assert.deepStrictEqual(parseSexp(tokens), [["a"], []])
  }

  {
    const tokens = lexer("(a b c)")
    assert.deepStrictEqual(parseSexp(tokens), [["a", "b", "c"], []])
  }

  {
    const tokens = lexer("((a b c) (a b c) (a b c))")
    assert.deepStrictEqual(parseSexp(tokens), [
      [
        ["a", "b", "c"],
        ["a", "b", "c"],
        ["a", "b", "c"],
      ],
      [],
    ])
  }
})
