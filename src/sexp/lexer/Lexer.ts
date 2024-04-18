import { ParserConfig, type ParserOptions } from "../parser/index.js"
import { Token } from "../token/index.js"
import { Lexing } from "./Lexing.js"

export class Lexer {
  config: ParserConfig

  constructor(public options: ParserOptions) {
    this.config = new ParserConfig(options)
  }

  lex(text: string): Array<Token> {
    return Array.from(new Lexing(this, text))
  }
}
