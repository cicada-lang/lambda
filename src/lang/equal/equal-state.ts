import { Value } from "../value"

export class EqualCtx {
  usedNames: Set<string>
  parents: Array<Value>

  constructor(options: { usedNames: Set<string>; parents: Array<Value> }) {
    this.usedNames = options.usedNames
    this.parents = options.parents
  }

  static init(): EqualCtx {
    return new EqualCtx({
      usedNames: new Set(),
      parents: [],
    })
  }

  useName(name: string): EqualCtx {
    return new EqualCtx({
      ...this,
      usedNames: new Set([...this.usedNames, name]),
    })
  }

  parent(value: Value): EqualCtx {
    return new EqualCtx({
      ...this,
      parents: [...this.parents, value],
    })
  }
}
