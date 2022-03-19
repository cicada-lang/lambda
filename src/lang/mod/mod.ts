import { Def } from "../def"
import { Exp } from "../exp"

export class Mod {
  defs: Map<string, Def> = new Map()

  constructor(public url: URL) {}

  define(name: string, exp: Exp): void {
    this.defs.set(name, new Def(this, name, exp))
  }
}
