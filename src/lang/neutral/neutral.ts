import { Span } from "../span"

export abstract class Neutral {
  abstract span: Span
  abstract format(): string
}
