import { type Env } from "../env/index.ts"
import { type Exp } from "../exp/index.ts"
import { type Mod } from "../mod/index.ts"
import { type Neutral } from "../neutral/index.ts"

export type Value = NotYet | Fn | FnRec | Lazy

export type NotYet = {
  "@type": "Value"
  kind: "NotYet"
  neutral: Neutral
}

export function NotYet(neutral: Neutral): NotYet {
  return {
    "@type": "Value",
    kind: "NotYet",
    neutral,
  }
}

export type Fn = {
  "@type": "Value"
  kind: "Fn"
  mod: Mod
  env: Env
  name: string
  ret: Exp
}

export function Fn(mod: Mod, env: Env, name: string, ret: Exp): Fn {
  return {
    "@type": "Value",
    kind: "Fn",
    mod,
    env,
    name,
    ret,
  }
}

export type FnRec = {
  "@type": "Value"
  kind: "FnRec"
  mod: Mod
  env: Env
  recName: string
  name: string
  ret: Exp
}

export function FnRec(
  mod: Mod,
  env: Env,
  recName: string,
  name: string,
  ret: Exp,
): FnRec {
  return {
    "@type": "Value",
    kind: "FnRec",
    mod,
    env,
    recName,
    name,
    ret,
  }
}

export type Lazy = {
  "@type": "Value"
  kind: "Lazy"
  mod: Mod
  env: Env
  exp: Exp
  cache?: Value
}

export function Lazy(mod: Mod, env: Env, exp: Exp, cache?: Value): Lazy {
  return {
    "@type": "Value",
    kind: "Lazy",
    mod,
    env,
    exp,
    cache,
  }
}
