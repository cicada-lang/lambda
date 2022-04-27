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
    return this.eta()
  }

  eta(): Value {
    return new Exps.Fn(
      "x",
      new Exps.Ap(new Exps.Var("f"), new Exps.Var("x"))
    ).evaluate(
      this.mod,
      this.env.extend("f", new Exps.NotYetValue(new Exps.FixpointNeutral(this)))
    )
  }

  wrapper(): Value {
    return new Exps.Fn(this.name, this.body).evaluate(this.mod, this.env)
  }

  apply(arg: Value): Value {
    if (arg instanceof Exps.LazyValue) {
      return this.apply(arg.active())
    }

    if (arg instanceof Exps.NotYetValue) {
      return apply(this.eta(), arg)
    } else {
      const fix = new Exps.Var("fix").evaluate(this.mod, this.env)
      return apply(apply(fix, this.wrapper()), arg)
    }
  }
}
