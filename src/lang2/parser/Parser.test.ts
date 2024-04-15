import assert from "node:assert"
import { test } from "node:test"
import { createLexer } from "./Lexer.js"
import {
  choose,
  literal,
  loop,
  type ParserResult,
  type Token,
} from "./index.js"

type Sexp = string | Array<Sexp>

function parseSexp(tokens: Array<Token>): ParserResult<Sexp> {
  return choose<Sexp>([parseSymbol, parseList])(tokens)
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
  return loop(parseSexp, {
    start: literal("symbol", "("),
    end: literal("symbol", ")"),
  })(tokens)
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
