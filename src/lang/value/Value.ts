import { Env } from "../env"
import type { Exp } from "../exp"
import { Mod } from "../mod"
import type { Neutral } from "../neutral"

export type Value = NotYet | Fn | Fixpoint | Lazy

export type NotYet = {
  family: "Value"
  kind: "NotYet"
  neutral: Neutral
}

export function NotYet(neutral: Neutral): NotYet {
  return {
    family: "Value",
    kind: "NotYet",
    neutral,
  }
}

export type Fn = {
  family: "Value"
  kind: "Fn"
  mod: Mod
  env: Env
  name: string
  ret: Exp
}

export function Fn(mod: Mod, env: Env, name: string, ret: Exp): Fn {
  return {
    family: "Value",
    kind: "Fn",
    mod,
    env,
    name,
    ret,
  }
}

export type Fixpoint = {
  family: "Value"
  kind: "Fixpoint"
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
    family: "Value",
    kind: "Fixpoint",
    mod,
    env,
    name,
    body,
  }
}

export type Lazy = {
  family: "Value"
  kind: "Lazy"
  mod: Mod
  env: Env
  exp: Exp
  cache?: Value
}

export function Lazy(mod: Mod, env: Env, exp: Exp, cache?: Value): Lazy {
  return {
    family: "Value",
    kind: "Lazy",
    mod,
    env,
    exp,
    cache,
  }
}
