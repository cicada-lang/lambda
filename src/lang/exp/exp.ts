import { Env } from "../env"
import { Value } from "../value"

export abstract class Exp {
  abstract evaluate(env: Env): Value
}
