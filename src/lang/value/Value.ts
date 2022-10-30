import * as Actions from "../actions"
import { Env } from "../env"
import * as Exps from "../exp"
import { Exp } from "../exp"
import { Mod } from "../mod"
import * as Neutrals from "../neutral"
import { Neutral } from "../neutral"
import { freshen } from "../utils/freshen"
import * as Values from "../value"
import {
  equal,
  EqualCtx,
  equalNeutral,
  ReadbackCtx,
  readbackNeutral,
} from "../value"

export abstract class Value {
  abstract readback(ctx: ReadbackCtx): Exp
  abstract equal(ctx: EqualCtx, that: Value): boolean

  preEqual?(): Value
  apply?(arg: Value): Value
}

export class NotYetValue extends Value {
  constructor(public neutral: Neutral) {
    super()
  }

  equal(ctx: EqualCtx, that: Value): boolean {
    return (
      that instanceof NotYetValue &&
      equalNeutral(ctx, this.neutral, that.neutral)
    )
  }

  readback(ctx: ReadbackCtx): Exp {
    return readbackNeutral(ctx, this.neutral)
  }

  apply(arg: Value): Value {
    return new Values.NotYetValue(Neutrals.Ap(this.neutral, arg))
  }
}

export class FnValue extends Value {
  constructor(
    public mod: Mod,
    public env: Env,
    public name: string,
    public ret: Exp,
  ) {
    super()
  }

  readback(ctx: ReadbackCtx): Exp {
    const freshName = freshen(ctx.usedNames, this.name)
    ctx = ctx.useName(freshName)
    const v = Neutrals.Var(freshName)
    const arg = new Values.NotYetValue(v)
    const ret = Actions.doAp(this, arg)
    return Exps.Fn(freshName, ret.readback(ctx))
  }

  equal(ctx: EqualCtx, that: Value): boolean {
    const freshName = freshen(ctx.usedNames, this.name)
    ctx = ctx.useName(freshName)
    const v = Neutrals.Var(freshName)
    const arg = new Values.NotYetValue(v)
    return equal(ctx, Actions.doAp(this, arg), Actions.doAp(that, arg))
  }

  apply(arg: Value): Value {
    return Exps.evaluate(this.mod, this.env.extend(this.name, arg), this.ret)
  }
}

export class FixpointValue extends Value {
  constructor(
    public mod: Mod,
    public env: Env,
    public name: string,
    public body: Exp,
  ) {
    super()
  }

  readback(ctx: ReadbackCtx): Exp {
    return Exps.Fixpoint(this.name, this.body)
  }

  equal(ctx: EqualCtx, that: Value): boolean {
    return equal(ctx, this, that)
  }

  preEqual(): Value {
    return this.eta()
  }

  eta(): Value {
    return Exps.evaluate(
      this.mod,
      this.env.extend("f", new Values.NotYetValue(Neutrals.Fixpoint(this))),
      Exps.Fn("x", Exps.Ap(Exps.Var("f"), Exps.Var("x"))),
    )
  }

  wrapper(): Value {
    return Exps.evaluate(this.mod, this.env, Exps.Fn(this.name, this.body))
  }

  apply(arg: Value): Value {
    if (arg instanceof Values.LazyValue) {
      return this.apply(arg.active())
    }

    if (arg instanceof Values.NotYetValue) {
      return Actions.doAp(this.eta(), arg)
    } else {
      const fix = Exps.evaluate(this.mod, this.env, Exps.Var("fix"))
      return Actions.doAp(Actions.doAp(fix, this.wrapper()), arg)
    }
  }
}

export class LazyValue extends Value {
  cache?: Value

  constructor(public mod: Mod, public env: Env, public exp: Exp) {
    super()
  }

  apply(arg: Value): Value {
    return Actions.doAp(this.active(), arg)
  }

  preEqual(): Value {
    return this.active()
  }

  active(): Value {
    if (this.cache !== undefined) {
      return this.cache
    }

    const value = Exps.evaluate(this.mod, this.env, this.exp)
    this.cache = value
    return value
  }

  readback(ctx: ReadbackCtx): Exp {
    return this.active().readback(ctx)
  }

  equal(ctx: EqualCtx, that: Value): boolean {
    return equal(ctx, this.active(), that)
  }
}
