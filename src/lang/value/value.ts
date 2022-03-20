import { Span } from "../span"

export abstract class Value {
  abstract span: Span
  abstract format(): string
}
