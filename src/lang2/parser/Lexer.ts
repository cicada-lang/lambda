import type { Token } from "./Token.js"

export type Lexer = (text: string) => Array<Token>
