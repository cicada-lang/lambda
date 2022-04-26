import { apply } from "../../apply"
import { Env } from "../../env"
import { EqualCtx } from "../../equal"
import { Exp } from "../../exp"
import * as Exps from "../../exps"
import { Mod } from "../../mod"
import { ReadbackCtx } from "../../readback"
import { Value } from "../../value"

export class FixpointValue extends Value {
  constructor(
    public mod: Mod,
    public env: Env,
    public name: string,
    public body: Exp
  ) {
    super()
  }

  readback(ctx: ReadbackCtx): Exp {
    return new Exps.Fixpoint(this.name, this.body)
  }

  equal(ctx: EqualCtx, that: Value): boolean {
    throw new Error()
    // const freshName = freshen(ctx.usedNames, this.name)
    // ctx = ctx.useName(freshName)
    // const v = new Exps.VarNeutral(freshName)
    // const arg = new Exps.NotYetValue(v)
    // return equal(ctx, apply(this, arg), apply(that, arg))
  }

  private wrap(): Exp {
    return new Exps.Fn(this.name, this.body)
  }

  apply(arg: Value): Value {
    const fn = new Exps.Ap(new Exps.Var("fix"), this.wrap())
    const fnValue = fn.evaluate(this.mod, this.env)
    return apply(fnValue, arg)
  }
}
