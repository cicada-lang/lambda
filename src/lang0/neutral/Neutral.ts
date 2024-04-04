import { type FnRecursive, type Value } from "../value/index.js"

export type Neutral = Var | Ap | ApRecursive

export type Var = {
  "@type": "Neutral"
  "@kind": "Var"
  name: string
}

export function Var(name: string): Var {
  return {
    "@type": "Neutral",
    "@kind": "Var",
    name,
  }
}

export type Ap = {
  "@type": "Neutral"
  "@kind": "Ap"
  target: Neutral
  arg: Value
}

export function Ap(target: Neutral, arg: Value): Ap {
  return {
    "@type": "Neutral",
    "@kind": "Ap",
    target,
    arg,
  }
}

export type ApRecursive = {
  "@type": "Neutral"
  "@kind": "ApRecursive"
  fn: FnRecursive
  arg: Neutral
}

export function ApRecursive(fn: FnRecursive, arg: Neutral): ApRecursive {
  return {
    "@type": "Neutral",
    "@kind": "ApRecursive",
    fn,
    arg,
  }
}
