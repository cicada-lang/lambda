import { Span } from "../span"

export abstract class Value {
  instanceofValue = true

  abstract span: Span
  abstract format(): string
}
