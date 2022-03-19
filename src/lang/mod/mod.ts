import { Def } from "../def"
import { Exp } from "../exp"
import { Value } from "../value"

export class Mod {
  defs: Map<string, Def> = new Map()

  constructor(public url: URL) {}

  define(name: string, exp: Exp): void {
    this.defs.set(name, new Def(this, name, exp))
  }

  lookup(name: string): Value | undefined {
    const def = this.defs.get(name)
    if (def === undefined) return undefined
    return def.refer()
  }
}
