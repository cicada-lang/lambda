import { InternalError } from "../errors"
import { Exp } from "../exp"

export type ReadbackEffect = (state: ReadbackState) => void

export class ReadbackCtx {
  used: Array<string>
  effects: Array<ReadbackEffect>

  constructor(options: {
    used: Array<string>
    effects: Array<ReadbackEffect>
  }) {
    this.used = options.used
    this.effects = options.effects
  }

  effect(effect: ReadbackEffect): ReadbackCtx {
    return new ReadbackCtx({
      ...this,
      effects: [effect, ...this.effects],
    })
  }

  build(): Exp {
    const state = new ReadbackState()
    for (const effect of this.effects) {
      effect(state)
    }

    const exp = state.expStack.pop()
    if (exp === undefined) {
      throw new InternalError(`state.expStack is empty`)
    }

    return exp
  }
}

export class ReadbackState {
  expStack: Array<Exp> = []
}
