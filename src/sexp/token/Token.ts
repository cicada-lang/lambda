import { Span } from "../span/index.ts"

export type TokenKind =
  | "Symbol"
  | "String"
  | "Number"
  | "ParenthesisStart"
  | "ParenthesisEnd"
  | "Quote"

export class Token {
  kind: TokenKind
  value: string
  span: Span

  constructor(options: { kind: TokenKind; value: string; span: Span }) {
    this.kind = options.kind
    this.value = options.value
    this.span = options.span
  }
}
