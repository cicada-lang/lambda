import type { Value } from "../value"
import * as Values from "../value"

export type Neutral = Var | Ap | Fixpoint

export type Var = {
  family: "Neutral"
  kind: "Var"
  name: string
}

export function Var(name: string): Var {
  return {
    family: "Neutral",
    kind: "Var",
    name,
  }
}

export type Ap = {
  family: "Neutral"
  kind: "Ap"
  target: Neutral
  arg: Value
}

export function Ap(target: Neutral, arg: Value): Ap {
  return {
    family: "Neutral",
    kind: "Ap",
    target,
    arg,
  }
}

export type Fixpoint = {
  family: "Neutral"
  kind: "Fixpoint"
  fixpoint: Values.Fixpoint
}

export function Fixpoint(fixpoint: Values.Fixpoint): Fixpoint {
  return {
    family: "Neutral",
    kind: "Fixpoint",
    fixpoint,
  }
}
