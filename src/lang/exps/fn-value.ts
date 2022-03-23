import { freshen } from "../../ut/freshen"
import { Env } from "../env"
import { EqualCtx } from "../equal"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Mod } from "../mod"
import { ReadbackCtx } from "../readback"
import { Value } from "../value"

export class FnValue extends Value {
  constructor(
    public mod: Mod,
    public env: Env,
    public name: string,
    public ret: Exp
  ) {
    super()
  }

  is(that: Value): boolean {
    return (
      that instanceof FnValue &&
      that.name === this.name &&
      that.ret.format() === this.ret.format() &&
      this.env.is(this.ret.freeNames(new Set([this.name])), that.env)
    )
  }

  apply(arg: Value, parents: Array<Value>): Value {
    return this.ret.evaluate(this.mod, this.env.extend(this.name, arg), parents)
  }

  readback(ctx: ReadbackCtx): Exp {
    const freshName = freshen(ctx.usedNames, this.name)
    ctx = ctx.useName(freshName)
    ctx = ctx.parent(this)
    const v = new Exps.VarNeutral(freshName, this.name)
    const arg = new Exps.NotYetValue(v)
    const ret = Exps.Ap.apply(this, arg, ctx.parents)
    return new Exps.Fn(freshName, ret.readback(ctx))
  }

  equal(ctx: EqualCtx, that: Value): boolean {
    if (that instanceof Exps.LazyValue) {
      return this.equal(ctx, that.active(ctx.parents))
    }

    const freshName = freshen(ctx.usedNames, this.name)
    ctx = ctx.useName(freshName)
    ctx = ctx.parent(this)
    const v = new Exps.VarNeutral(freshName, this.name)
    const arg = new Exps.NotYetValue(v)

    const ret = Exps.Ap.apply(this, arg, ctx.parents)
    const thatRet = Exps.Ap.apply(that, arg, ctx.parents)

    return ret.equal(ctx, thatRet)
  }
}
