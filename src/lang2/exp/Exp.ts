import { type Substitution } from "../substitution/index.js"

export type Exp = Var | Lazy | Fn | Ap | Let

export type Var = {
  "@type": "Exp"
  "@kind": "Var"
  name: string
}

export function Var(name: string): Var {
  return {
    "@type": "Exp",
    "@kind": "Var",
    name,
  }
}

export type Lazy = {
  "@type": "Exp"
  "@kind": "Lazy"
  exp: Exp
  cache?: Exp
}

export function Lazy(exp: Exp, cache?: Exp): Lazy {
  return {
    "@type": "Exp",
    "@kind": "Lazy",
    exp,
    cache,
  }
}

export type Fn = {
  "@type": "Exp"
  "@kind": "Fn"
  name: string
  ret: Exp
}

export function Fn(name: string, ret: Exp): Fn {
  return {
    "@type": "Exp",
    "@kind": "Fn",
    name,
    ret,
  }
}

export type Ap = {
  "@type": "Exp"
  "@kind": "Ap"
  target: Exp
  arg: Exp
}

export function Ap(target: Exp, arg: Exp): Ap {
  return {
    "@type": "Exp",
    "@kind": "Ap",
    target,
    arg,
  }
}

export type Let = {
  "@type": "Exp"
  "@kind": "Let"
  substitution: Substitution
  body: Exp
}

export function Let(substitution: Substitution, body: Exp): Let {
  return {
    "@type": "Exp",
    "@kind": "Let",
    substitution,
    body,
  }
}
