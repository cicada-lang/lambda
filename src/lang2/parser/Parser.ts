import type { Token } from "./index.js"

export type ParserResult<A> = [A, Array<Token>]

export type Parser<A> = (tokens: Array<Token>) => ParserResult<A>

export function choose<A>(parsers: Array<Parser<A>>): Parser<A> {
  return (tokens) => {
    for (const parser of parsers) {
      try {
        return parser(tokens)
      } catch (_error) {
        //
      }
    }

    throw new Error(`[choose]`)
  }
}
