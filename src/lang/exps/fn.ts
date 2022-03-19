import { Env } from "../env"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Span } from "../span"
import { Value } from "../value"
import { Closure } from "./closure"

export class Fn extends Exp {
  constructor(public name: string, public ret: Exp, public span: Span) {
    super()
  }

  evaluate(env: Env): Value {
    return new Exps.FnValue(new Closure(env, this.name, this.ret))
  }
}
