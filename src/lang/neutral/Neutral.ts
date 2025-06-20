import { type FnRec, type Value } from "../value/index.ts"

export type Neutral = Var | Ap | ApRecursive

export type Var = {
  kind: "Var"
  name: string
}

export function Var(name: string): Var {
  return {
    kind: "Var",
    name,
  }
}

export type Ap = {
  kind: "Ap"
  target: Neutral
  arg: Value
}

export function Ap(target: Neutral, arg: Value): Ap {
  return {
    kind: "Ap",
    target,
    arg,
  }
}

export type ApRecursive = {
  kind: "ApRecursive"
  fn: FnRec
  arg: Neutral
}

export function ApRecursive(fn: FnRec, arg: Neutral): ApRecursive {
  return {
    kind: "ApRecursive",
    fn,
    arg,
  }
}
