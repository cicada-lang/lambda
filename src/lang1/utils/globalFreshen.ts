import {
  numberSubscripts,
  stringToSubscript,
} from "../../utils/stringToSubscript.js"

export let globalNameCounters: Map<string, number> = new Map()

export function globalFreshen(name: string): string {
  name = nameWithoutSubscript(name)
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

function nameWithoutSubscript(name: string): string {
  const subscripts = Array.from(Object.values(numberSubscripts))
  const chars = name.split("")
  return chars.filter((char) => !subscripts.includes(char)).join("")
}
