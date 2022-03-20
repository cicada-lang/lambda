import { Env } from "../env"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Mod } from "../mod"
import { Value } from "../value"

export class Fn extends Exp {
  constructor(public name: string, public ret: Exp) {
    super()
  }

  evaluate(mod: Mod, env: Env): Value {
    return new Exps.FnValue(mod, env, this.name, this.ret)
  }

  format(): string {
    const { names, exp } = formatAux([], this)
    return `(lambda (${names.join(" ")}) ${exp})`
  }
}

function formatAux(
  names: Array<string>,
  exp: Exp
): { names: Array<string>; exp: string } {
  if (exp instanceof Fn) {
    return formatAux([...names, exp.name], exp.ret)
  } else {
    return { names, exp: exp.format() }
  }
}
