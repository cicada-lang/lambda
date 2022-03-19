import { Def } from "../def"

export class Module {
  defs: Map<string, Def> = new Map()

  constructor(public url: URL) {}
}
