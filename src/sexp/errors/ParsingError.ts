import { Span } from "../span/index.js"

export class ParsingError extends Error {
  constructor(
    message: string,
    public span: Span,
  ) {
    super(message)
  }

  report(text: string): string {
    return [this.message + "\n", this.span.report(text)].join("\n")
  }
}
