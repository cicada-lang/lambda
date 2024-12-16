import { type Value } from "../value/index.ts"

export type Env = Map<string, Value>

export function envEmpty(): Env {
  return new Map()
}

export function envNames(env: Env): Array<string> {
  return Array.from(env.keys())
}

export function envFindValue(env: Env, name: string): undefined | Value {
  return env.get(name)
}

export function envExtend(env: Env, name: string, value: Value): Env {
  return new Map([...env, [name, value]])
}
