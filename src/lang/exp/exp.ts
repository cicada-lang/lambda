import { Env } from "../env"
import { Span } from "../span"
import { Value } from "../value"

export abstract class Exp {
  abstract span: Span
  abstract evaluate(env: Env): Value
}
