import { Value } from "../value"

export class EqualCtx {
  usedNames: Set<string>
  parentPairs: Array<{ left: Value; right: Value }>

  constructor(options: {
    usedNames: Set<string>
    parentPairs: Array<{ left: Value; right: Value }>
  }) {
    this.usedNames = options.usedNames
    this.parentPairs = options.parentPairs
  }

  static init(): EqualCtx {
    return new EqualCtx({
      usedNames: new Set(),
      parentPairs: [],
    })
  }

  useName(name: string): EqualCtx {
    return new EqualCtx({
      ...this,
      usedNames: new Set([...this.usedNames, name]),
    })
  }

  parentPair(left: Value, right: Value): EqualCtx {
    return new EqualCtx({
      ...this,
      parentPairs: [...this.parentPairs, { left, right }],
    })
  }
}
