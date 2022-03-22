import { InternalError } from "../errors"
import { Exp } from "../exp"
import { Value } from "../value"

export type ReadbackEffect = (state: ReadbackState) => void

export class ReadbackCtx {
  usedNames: Set<string>
  effects: Array<ReadbackEffect>
  parents: Array<{ value: Value; effect: ReadbackEffect }>

  constructor(options: {
    usedNames: Set<string>
    effects: Array<ReadbackEffect>
    parents: Array<{ value: Value; effect: ReadbackEffect }>
  }) {
    this.usedNames = options.usedNames
    this.effects = options.effects
    this.parents = options.parents
  }

  static init(): ReadbackCtx {
    return new ReadbackCtx({
      usedNames: new Set(),
      effects: [],
      parents: [],
    })
  }

  useName(name: string): ReadbackCtx {
    return new ReadbackCtx({
      ...this,
      usedNames: new Set([name, ...this.usedNames]),
    })
  }

  parent(value: Value, effect: ReadbackEffect): ReadbackCtx {
    return new ReadbackCtx({
      ...this,
      parents: [...this.parents, { value, effect }],
    })
  }

  effect(effect: ReadbackEffect): ReadbackCtx {
    return new ReadbackCtx({
      ...this,
      effects: [...this.effects, effect],
    })
  }

  meetCircle(value: Value): boolean {
    return this.parents.some((parent) => {
      return parent.value.hash === value.hash
    })
  }

  build(): Exp {
    const state = new ReadbackState()
    for (const effect of this.effects) {
      effect(state)
    }

    return state.popExpOrFail()
  }
}

export class ReadbackState {
  expStack: Array<Exp> = []

  pushExp(exp: Exp): void {
    this.expStack.push(exp)
  }

  popExpOrFail(): Exp {
    const exp = this.expStack.pop()
    if (exp === undefined) {
      throw new InternalError("expStack is empty")
    }

    return exp
  }
}
