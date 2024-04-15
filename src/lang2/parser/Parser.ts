import type { Token } from "./index.js"

export type ParserResult<A> = [A, Array<Token>]

export type Parser<A> = (tokens: Array<Token>) => ParserResult<A>
