import { InternalError, ParsingError } from "../errors/index.ts"
import { Parser } from "../parser/index.ts"
import { Position } from "../position/index.ts"
import * as Sexps from "../sexp/index.ts"
import { type Sexp } from "../sexp/index.ts"
import { Span } from "../span/index.ts"
import { Token } from "../token/index.ts"

type Result = { sexp: Sexp; remain: Array<Token> }

export class Parsing {
  index = 0

  constructor(public parser: Parser) {}

  parse(tokens: Array<Token>): Result {
    if (tokens[0] === undefined) {
      throw new ParsingError(
        "I expect to see a token, but there is no token remain.",
        new Span(Position.init(), Position.init()),
      )
    }

    switch (tokens[0].kind) {
      case "Symbol": {
        if (this.parser.config.isNull(tokens[0].value)) {
          return {
            sexp: Sexps.Null(tokens[0].span),
            remain: tokens.slice(1),
          }
        }

        if (tokens[0].value === ".") {
          throw new ParsingError(
            `I found "." (the dot) at wrong place.`,
            tokens[0].span,
          )
        }

        return {
          sexp: Sexps.Sym(tokens[0].value, tokens[0].span),
          remain: tokens.slice(1),
        }
      }

      case "Number": {
        const value = JSON.parse(tokens[0].value)
        if (typeof value !== "number") {
          throw new InternalError(
            `I expect value to be a JSON number: ${value}`,
          )
        }

        return {
          sexp: Sexps.Num(value, tokens[0].span),
          remain: tokens.slice(1),
        }
      }

      case "String": {
        const value = JSON.parse(tokens[0].value)
        if (typeof value !== "string") {
          throw new InternalError(
            `I expect value to be a JSON string: ${value}`,
          )
        }

        return {
          sexp: Sexps.Str(value, tokens[0].span),
          remain: tokens.slice(1),
        }
      }

      case "ParenthesisStart": {
        return this.parseList(
          tokens[0],
          tokens.slice(1),
          Sexps.Null(tokens[0].span),
        )
      }

      case "ParenthesisEnd": {
        throw new ParsingError(`I found extra ParenthesisEnd`, tokens[0].span)
      }

      case "Quote": {
        const { sexp, remain } = this.parse(tokens.slice(1))

        const first = Sexps.Sym(
          this.parser.config.findQuoteSymbolOrFail(tokens[0].value),
          tokens[0].span,
        )

        const second = Sexps.Cons(
          sexp,
          Sexps.Null(tokens[0].span),
          tokens[0].span.union(sexp.span),
        )

        return {
          sexp: Sexps.Cons(first, second, first.span.union(second.span)),
          remain,
        }
      }
    }
  }

  private parseList(
    start: Token,
    tokens: Array<Token>,
    list: Sexps.Cons | Sexps.Null,
  ): Result {
    if (tokens[0] === undefined) {
      throw new ParsingError(`Missing ParenthesisEnd`, start.span)
    }

    if (tokens[0].kind === "Symbol" && tokens[0].value === ".") {
      const { sexp, remain } = this.parse(tokens.slice(1))

      if (remain[0] === undefined) {
        throw new ParsingError(`Missing ParenthesisEnd`, start.span)
      }

      if (!this.parser.config.matchParentheses(start.value, remain[0].value)) {
        throw new ParsingError(
          `I expect a matching ParenthesisEnd`,
          remain[0].span,
        )
      }

      return { sexp, remain: remain.slice(1) }
    }

    if (tokens[0].kind === "ParenthesisEnd") {
      if (!this.parser.config.matchParentheses(start.value, tokens[0].value)) {
        throw new ParsingError(
          `I expect a matching ParenthesisEnd`,
          tokens[0].span,
        )
      }

      list.span = tokens[0].span

      return { sexp: list, remain: tokens.slice(1) }
    }

    const head = this.parse(tokens)

    const { sexp, remain } = this.parseList(start, head.remain, list)

    return {
      sexp: Sexps.Cons(head.sexp, sexp, head.sexp.span.union(sexp.span)),
      remain,
    }
  }
}
