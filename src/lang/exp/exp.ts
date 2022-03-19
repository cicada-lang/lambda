import { Env } from "../env"
import { Value } from "../value"
import { Span } from "../span"

export abstract class Exp {
  abstract span: Span
  abstract evaluate(env: Env): Value
}
