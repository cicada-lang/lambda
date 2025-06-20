import { type FnRec, type Value } from "../value/index.ts"

export type Neutral = Var | Ap | ApRecursive
export type Var = { kind: "Var"; name: string }
export type Ap = { kind: "Ap"; target: Neutral; arg: Value }
export type ApRecursive = { kind: "ApRecursive"; fn: FnRec; arg: Neutral }

export function Var(name: string): Var {
  return {
    kind: "Var",
    name,
  }
}

export function Ap(target: Neutral, arg: Value): Ap {
  return {
    kind: "Ap",
    target,
    arg,
  }
}

export function ApRecursive(fn: FnRec, arg: Neutral): ApRecursive {
  return {
    kind: "ApRecursive",
    fn,
    arg,
  }
}
