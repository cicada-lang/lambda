import { Exp } from "../exp"
import { Span } from "../span"

export abstract class Neutral {
  instanceofNeutral = true

  abstract span: Span
  abstract readback(used: Set<string>): Exp
  abstract format(): string
}
