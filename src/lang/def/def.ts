import { Mod } from "../mod"
import { Value } from "../value"

export class Def {
  constructor(public mod: Mod, public name: string, public value: Value) {}
}
