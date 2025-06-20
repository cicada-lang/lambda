import { type Env } from "../env/index.ts"
import { type Exp } from "../exp/index.ts"
import { type Mod } from "../mod/index.ts"
import { type Neutral } from "../neutral/index.ts"

export type Value = NotYet | Fn | FnRec | Lazy

export type NotYet = {
  kind: "NotYet"
  neutral: Neutral
}

export function NotYet(neutral: Neutral): NotYet {
  return {
    kind: "NotYet",
    neutral,
  }
}

export type Fn = {
  kind: "Fn"
  mod: Mod
  env: Env
  name: string
  ret: Exp
}

export function Fn(mod: Mod, env: Env, name: string, ret: Exp): Fn {
  return {
    kind: "Fn",
    mod,
    env,
    name,
    ret,
  }
}

export type FnRec = {
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
    kind: "FnRec",
    mod,
    env,
    recName,
    name,
    ret,
  }
}

export type Lazy = {
  kind: "Lazy"
  mod: Mod
  env: Env
  exp: Exp
  cache?: Value
}

export function Lazy(mod: Mod, env: Env, exp: Exp, cache?: Value): Lazy {
  return {
    kind: "Lazy",
    mod,
    env,
    exp,
    cache,
  }
}
