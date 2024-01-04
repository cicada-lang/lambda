import { LangError } from "./LangError.js"

export class ConversionError extends LangError {
  constructor(public message: string) {
    super(message)
  }
}
