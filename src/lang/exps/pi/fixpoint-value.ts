import { apply } from "../../apply"
import { Env } from "../../env"
import { equal, EqualCtx } from "../../equal"
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
    return equal(ctx, this, that)
  }

  preEqual(): Value {
    const wrap = this.wrap()
    return wrap.evaluate(this.mod, this.env)
  }

  private wrap(): Exp {
    return new Exps.Fn(this.name, this.body)
  }

  private fnValue(): Value {
    const fn = new Exps.Ap(new Exps.Var("fix"), this.wrap())
    return fn.evaluate(this.mod, this.env)
  }

  apply(arg: Value): Value {
    return apply(this.fnValue(), arg)
  }
}
