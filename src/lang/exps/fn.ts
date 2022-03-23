import { Env } from "../env"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Mod } from "../mod"
import { Value } from "../value"

export class Fn extends Exp {
  constructor(public name: string, public ret: Exp) {
    super()
  }

  freeNames(boundNames: Set<string>): Set<string> {
    return this.ret.freeNames(new Set([...boundNames, this.name]))
  }

  evaluate(mod: Mod, env: Env): Value {
    return new Exps.FnValue(mod, env, this.name, this.ret)
  }

  format(): string {
    const { names, ret } = formatFn([this.name], this.ret)
    return `(lambda (${names.join(" ")}) ${ret})`
  }
}

function formatFn(
  names: Array<string>,
  ret: Exp
): { names: Array<string>; ret: string } {
  if (ret instanceof Fn) {
    return formatFn([...names, ret.name], ret.ret)
  } else {
    return { names, ret: ret.format() }
  }
}
