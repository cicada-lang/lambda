import { Value } from "../value"
import { Closure } from "./closure"

export class FnValue extends Value {
  constructor(public ret_cl: Closure) {
    super()
  }
}
