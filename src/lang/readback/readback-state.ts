import { InternalError } from "../errors"
import { Exp } from "../exp"
import { Value } from "../value"

export type ReadbackEffect = (state: ReadbackState) => void

type EffectEntry = {
  effect: ReadbackEffect
  value?: Value
}

export class ReadbackCtx {
  usedNames: Set<string>
  effects: Array<EffectEntry>

  constructor(options: {
    usedNames: Set<string>
    effects: Array<EffectEntry>
  }) {
    this.usedNames = options.usedNames
    this.effects = options.effects
  }

  static init(): ReadbackCtx {
    return new ReadbackCtx({
      usedNames: new Set(),
      effects: [],
    })
  }

  useName(name: string): ReadbackCtx {
    return new ReadbackCtx({
      ...this,
      usedNames: new Set([name, ...this.usedNames]),
    })
  }

  effect(effect: ReadbackEffect): ReadbackCtx {
    return new ReadbackCtx({
      ...this,
      effects: [...this.effects, { effect }],
    })
  }

  build(): Exp {
    const state = new ReadbackState()
    for (const { effect } of this.effects) {
      effect(state)
    }

    const exp = state.popExpOrFail()
    if (exp === undefined) {
      throw new InternalError(`state.expStack is empty`)
    }

    return exp
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
      throw new InternalError(`expStack is empty`)
    }

    return exp
  }
}
