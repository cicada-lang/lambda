import { Value } from "../value"

export class ReadbackCtx {
  usedNames: Set<string>
  parents: Array<Value>

  constructor(options: { usedNames: Set<string>; parents: Array<Value> }) {
    this.usedNames = options.usedNames
    this.parents = options.parents
  }

  static init(): ReadbackCtx {
    return new ReadbackCtx({
      usedNames: new Set(),
      parents: [],
    })
  }

  useName(name: string): ReadbackCtx {
    return new ReadbackCtx({
      ...this,
      usedNames: new Set([...this.usedNames, name]),
    })
  }

  parent(value: Value): ReadbackCtx {
    return new ReadbackCtx({
      ...this,
      parents: [...this.parents, value],
    })
  }
}
