import { apply } from "../apply"
import { Env } from "../env"
import { equal, EqualCtx } from "../equal"
import * as Exps from "../exp"
import { Exp } from "../exp"
import { Mod } from "../mod"
import * as Neutrals from "../neutral"
import { ReadbackCtx } from "../readback"
import * as Values from "../value"
import { Value } from "../value"

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
      new Exps.Ap(new Exps.Var("f"), new Exps.Var("x")),
    ).evaluate(
      this.mod,
      this.env.extend(
        "f",
        new Values.NotYetValue(new Neutrals.FixpointNeutral(this)),
      ),
    )
  }

  wrapper(): Value {
    return new Exps.Fn(this.name, this.body).evaluate(this.mod, this.env)
  }

  apply(arg: Value): Value {
    if (arg instanceof Values.LazyValue) {
      return this.apply(arg.active())
    }

    if (arg instanceof Values.NotYetValue) {
      return apply(this.eta(), arg)
    } else {
      const fix = new Exps.Var("fix").evaluate(this.mod, this.env)
      return apply(apply(fix, this.wrapper()), arg)
    }
  }
}
