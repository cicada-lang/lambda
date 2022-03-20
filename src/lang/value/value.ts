import { Exp } from "../exp"
import { Span } from "../span"

export abstract class Value {
  instanceofValue = true

  abstract span: Span
  abstract readback(used: Set<string>): Exp
  abstract format(): string
}
