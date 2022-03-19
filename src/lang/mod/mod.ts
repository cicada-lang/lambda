import { Def } from "../def"

export class Mod {
  defs: Map<string, Def> = new Map()

  constructor(public url: URL) {}
}
