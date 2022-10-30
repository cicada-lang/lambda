import { apply } from "../apply"
import { Env } from "../env"
import { equal, EqualCtx } from "../equal"
import * as Exps from "../exp"
import { Exp } from "../exp"
import { Mod } from "../mod"
import * as Neutrals from "../neutral"
import { ReadbackCtx } from "../readback"
import { freshen } from "../utils/freshen"
import * as Values from "../value"
import { Value } from "../value"

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
    const v = new Neutrals.VarNeutral(freshName)
    const arg = new Values.NotYetValue(v)
    const ret = apply(this, arg)
    return new Exps.Fn(freshName, ret.readback(ctx))
  }

  equal(ctx: EqualCtx, that: Value): boolean {
    const freshName = freshen(ctx.usedNames, this.name)
    ctx = ctx.useName(freshName)
    const v = new Neutrals.VarNeutral(freshName)
    const arg = new Values.NotYetValue(v)
    return equal(ctx, apply(this, arg), apply(that, arg))
  }

  apply(arg: Value): Value {
    return this.ret.evaluate(this.mod, this.env.extend(this.name, arg))
  }
}
