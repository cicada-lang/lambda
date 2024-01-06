import type * as Values from "../value/index.js"
import { type Value } from "../value/index.js"

export type Neutral = Var | Ap | Fixpoint

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

export type Fixpoint = {
  "@type": "Neutral"
  "@kind": "Fixpoint"
  fixpoint: Values.Fixpoint
}

export function Fixpoint(fixpoint: Values.Fixpoint): Fixpoint {
  return {
    "@type": "Neutral",
    "@kind": "Fixpoint",
    fixpoint,
  }
}
