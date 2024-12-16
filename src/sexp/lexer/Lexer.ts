import { ParserConfig, type ParserOptions } from "../parser/index.ts"
import { Token } from "../token/index.ts"
import { Lexing } from "./Lexing.ts"

export class Lexer {
  config: ParserConfig

  constructor(public options: ParserOptions) {
    this.config = new ParserConfig(options)
  }

  lex(text: string): Array<Token> {
    return Array.from(new Lexing(this, text))
  }
}
