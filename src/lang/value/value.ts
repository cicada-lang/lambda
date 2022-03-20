import { Exp } from "../exp"

export abstract class Value {
  instanceofValue = true

  abstract readback(used: Set<string>): Exp
  abstract format(): string
}
