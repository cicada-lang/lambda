import type { Span } from "../span/index.js"
import { LangError } from "./LangError.js"

export class ElaborationError extends LangError {
  constructor(
    public message: string,
    public span: Span,
  ) {
    super(message)
  }

  report(text: string): string {
    return [this.message + "\n", this.span.report(text)].join("\n")
  }
}
