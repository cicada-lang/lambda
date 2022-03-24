import { LangError } from "./lang-error"

export class AssertionError extends LangError {
  constructor(public message: string) {
    super(message)
  }
}
