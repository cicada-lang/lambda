import { apply } from "../apply"
import { findBuiltinValue } from "../builtin"
import { Env } from "../env"
import { LangError } from "../errors"
import { Mod } from "../mod"
import * as Values from "../value"
import { Value } from "../value"

export abstract class Exp {
  abstract freeNames(boundNames: Set<string>): Set<string>
  abstract evaluate(mod: Mod, env: Env): Value
  abstract format(): string
}

export class Var extends Exp {
  constructor(public name: string) {
    super()
  }

  freeNames(boundNames: Set<string>): Set<string> {
    return boundNames.has(this.name) ? new Set() : new Set([this.name])
  }

  evaluate(mod: Mod, env: Env): Value {
    let value = undefined

    value = env.findValue(this.name)
    if (value !== undefined) return value

    value = mod.findValue(this.name)
    if (value !== undefined) return value

    value = findBuiltinValue(mod, env, this.name)
    if (value !== undefined) return value

    throw new LangError(`Unknown name: ${this.name}`)
  }

  format(): string {
    return this.name
  }
}

export class Ap extends Exp {
  constructor(public target: Exp, public arg: Exp) {
    super()
  }

  freeNames(boundNames: Set<string>): Set<string> {
    return new Set([
      ...this.target.freeNames(boundNames),
      ...this.arg.freeNames(boundNames),
    ])
  }

  evaluate(mod: Mod, env: Env): Value {
    const target = this.target.evaluate(mod, env)
    const arg = new Values.LazyValue(mod, env, this.arg)
    return apply(target, arg)
  }

  format(): string {
    const { target, args } = formatAp(this.target, [this.arg.format()])
    return `(${target} ${args.join(" ")})`
  }
}

function formatAp(
  target: Exp,
  args: Array<string>,
): { target: string; args: Array<string> } {
  if (target instanceof Ap) {
    return formatAp(target.target, [target.arg.format(), ...args])
  } else {
    return { target: target.format(), args }
  }
}

export class Fixpoint extends Exp {
  constructor(public name: string, public body: Exp) {
    super()
  }

  freeNames(boundNames: Set<string>): Set<string> {
    return this.body.freeNames(new Set([...boundNames, this.name]))
  }

  evaluate(mod: Mod, env: Env): Value {
    return new Values.FixpointValue(mod, env, this.name, this.body)
  }

  format(): string {
    return `(fixpoint ${this.name} ${this.body.format()})`
  }
}

export class Fn extends Exp {
  constructor(public name: string, public ret: Exp) {
    super()
  }

  freeNames(boundNames: Set<string>): Set<string> {
    return this.ret.freeNames(new Set([...boundNames, this.name]))
  }

  evaluate(mod: Mod, env: Env): Value {
    return new Values.FnValue(mod, env, this.name, this.ret)
  }

  format(): string {
    const { names, ret } = formatFn([this.name], this.ret)
    return `(lambda (${names.join(" ")}) ${ret})`
  }
}

function formatFn(
  names: Array<string>,
  ret: Exp,
): { names: Array<string>; ret: string } {
  if (ret instanceof Fn) {
    return formatFn([...names, ret.name], ret.ret)
  } else {
    return { names, ret: ret.format() }
  }
}
