import { Module } from "../module"
import { Exp } from "../exp"

export class Def {
  constructor(public mod: Module, public name: string, exp: Exp) {}

  // refer(): Value
}
