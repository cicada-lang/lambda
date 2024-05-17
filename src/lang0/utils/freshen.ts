import { stringToSubscript } from "../../utils/stringToSubscript.js"

export function freshen(
  usedNames: Array<string> | Set<string>,
  name: string,
): string {
  usedNames = new Set(usedNames)
  let counter = 1
  let freshName = name
  while (true) {
    if (usedNames.has(freshName)) {
      const subscript = stringToSubscript(String(counter++))
      freshName = `${name}${subscript}`
    } else {
      return freshName
    }
  }
}
