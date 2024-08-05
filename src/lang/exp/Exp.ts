import { type Substitution } from "../substitution/index.js"

export type Exp = Var | Fn | FnRecursive | Ap | Let

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

export type FnRecursive = {
  "@type": "Exp"
  "@kind": "FnRecursive"
  recursiveName: string
  name: string
  ret: Exp
}

export function FnRecursive(
  recursiveName: string,
  name: string,
  ret: Exp,
): FnRecursive {
  return {
    "@type": "Exp",
    "@kind": "FnRecursive",
    recursiveName,
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
