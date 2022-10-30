import { equal, EqualCtx } from "../equal"
import * as Exps from "../exp"
import { Exp } from "../exp"
import { ReadbackCtx } from "../readback"
import * as Values from "../value"
import { Value } from "../value"

export abstract class Neutral {
  abstract readback(ctx: ReadbackCtx): Exp
  abstract equal(ctx: EqualCtx, that: Neutral): boolean
}

export class VarNeutral extends Neutral {
  constructor(public name: string) {
    super()
  }

  readback(ctx: ReadbackCtx): Exp {
    return Exps.Var(this.name)
  }

  equal(ctx: EqualCtx, that: Neutral): boolean {
    return that instanceof VarNeutral && that.name === this.name
  }
}

export class ApNeutral extends Neutral {
  constructor(public target: Neutral, public arg: Value) {
    super()
  }

  readback(ctx: ReadbackCtx): Exp {
    return Exps.Ap(this.target.readback(ctx), this.arg.readback(ctx))
  }

  equal(ctx: EqualCtx, that: Neutral): boolean {
    return (
      that instanceof ApNeutral &&
      this.target.equal(ctx, that.target) &&
      equal(ctx, this.arg, that.arg)
    )
  }
}

export class FixpointNeutral extends Neutral {
  constructor(public fixpoint: Values.FixpointValue) {
    super()
  }

  readback(ctx: ReadbackCtx): Exp {
    return this.fixpoint.readback(ctx)
  }

  equal(ctx: EqualCtx, that: Neutral): boolean {
    return (
      that instanceof FixpointNeutral &&
      this.fixpoint.wrapper().equal(ctx, that.fixpoint.wrapper())
    )
  }
}
