import { Env } from "../env"
import { Mod } from "../mod"
import { Value } from "../value"

export abstract class Exp {
  instanceofExp = true

  abstract evaluate(mod: Mod, env: Env): Value
  abstract format(): string
}
