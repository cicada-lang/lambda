import { Env } from "../env"
import { Mod } from "../mod"
import { Span } from "../span"
import { Value } from "../value"

export abstract class Exp {
  abstract span: Span
  abstract evaluate(mod: Mod, env: Env): Value
}
