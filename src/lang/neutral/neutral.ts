import { Exp } from "../exp"

export abstract class Neutral {
  instanceofNeutral = true

  abstract preHash: string
  abstract readback(used: Set<string>): Exp
}
