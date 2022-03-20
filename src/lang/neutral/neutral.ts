import { Exp } from "../exp"

export abstract class Neutral {
  instanceofNeutral = true

  abstract readback(used: Set<string>): Exp
}
