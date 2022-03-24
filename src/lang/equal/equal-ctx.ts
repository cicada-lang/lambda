import * as Exps from "../exps"
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

  checkOccur(left: Value, right: Value): boolean {
    if (left instanceof Exps.LazyValue || left instanceof Exps.ApThunkValue) {
      return this.checkOccur(left.active(), right)
    }

    if (right instanceof Exps.LazyValue || right instanceof Exps.ApThunkValue) {
      return this.checkOccur(left, right.active())
    }

    return Boolean(
      this.parentPairs.find(
        (pair) =>
          (pair.left.is(left) && pair.right.is(right)) ||
          (pair.left.is(right) && pair.right.is(left))
      )
    )
  }
}
