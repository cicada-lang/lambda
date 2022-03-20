import { Span } from "../span"

export abstract class Neutral {
  instanceofNeutral = true

  abstract span: Span
  abstract format(): string
}
