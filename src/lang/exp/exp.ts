import { Env } from "../env"
import { Mod } from "../mod"
import { Value } from "../value"

export abstract class Exp {
  instanceofExp = true

  abstract freeNames(boundNames: Set<string>): Set<string>
  abstract evaluate(mod: Mod, env: Env): Value
  abstract format(): string
}
