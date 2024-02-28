import { stringToSubscript } from "../../utils/stringToSubscript.js"

export let globalNameCounter = 1

export function freshen(name: string): string {
  const subscript = stringToSubscript(String(globalNameCounter++))
  return `${name}${subscript}`
}
