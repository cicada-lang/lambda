import { Env } from "../env"
import type { Exp } from "../exp"
import { Mod } from "../mod"
import type { Neutral } from "../neutral"

export type Value = NotYet | Fn | Fixpoint | Lazy

export type NotYet = {
  "@type": "Value"
  "@kind": "NotYet"
  neutral: Neutral
}

export function NotYet(neutral: Neutral): NotYet {
  return {
    "@type": "Value",
    "@kind": "NotYet",
    neutral,
  }
}

export type Fn = {
  "@type": "Value"
  "@kind": "Fn"
  mod: Mod
  env: Env
  name: string
  ret: Exp
}

export function Fn(mod: Mod, env: Env, name: string, ret: Exp): Fn {
  return {
    "@type": "Value",
    "@kind": "Fn",
    mod,
    env,
    name,
    ret,
  }
}

export type Fixpoint = {
  "@type": "Value"
  "@kind": "Fixpoint"
  mod: Mod
  env: Env
  name: string
  body: Exp
}

export function Fixpoint(
  mod: Mod,
  env: Env,
  name: string,
  body: Exp,
): Fixpoint {
  return {
    "@type": "Value",
    "@kind": "Fixpoint",
    mod,
    env,
    name,
    body,
  }
}

export type Lazy = {
  "@type": "Value"
  "@kind": "Lazy"
  mod: Mod
  env: Env
  exp: Exp
  cache?: Value
}

export function Lazy(mod: Mod, env: Env, exp: Exp, cache?: Value): Lazy {
  return {
    "@type": "Value",
    "@kind": "Lazy",
    mod,
    env,
    exp,
    cache,
  }
}
