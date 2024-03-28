import { stringToSubscript } from "../../utils/stringToSubscript.js"

export let globalNameCounters: Map<string, number> = new Map()

export function freshen(name: string): string {
  const globalNameCounter = globalNameCounters.get(name)
  if (globalNameCounter === undefined) {
    globalNameCounters.set(name, 1)
    const subscript = stringToSubscript(String(1))
    return `${name}${subscript}`
  } else {
    globalNameCounters.set(name, globalNameCounter + 1)
    const subscript = stringToSubscript(String(globalNameCounter + 1))
    return `${name}${subscript}`
  }
}
