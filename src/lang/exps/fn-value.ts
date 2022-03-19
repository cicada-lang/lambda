import { Value } from "../value"
import { Closure } from "./closure"

export class FnValue extends Value {
  constructor(public ret_cl: Closure) {
    super()
  }

  apply(arg: Value): Value {
    return this.ret_cl.apply(arg)
  }
}
