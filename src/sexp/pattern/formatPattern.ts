import { unfoldFormatCons, type Pattern } from "../pattern/index.ts"

export function formatPattern(pattern: Pattern): string {
  switch (pattern.kind) {
    case "Var": {
      return `<${pattern.name}>`
    }

    case "Cons":
    case "Null": {
      const { heads, tail } = unfoldFormatCons(pattern)
      return tail ? `(${heads.join(" ")} . ${tail})` : `(${heads.join(" ")})`
    }

    case "Num": {
      return pattern.value.toString()
    }

    case "Str": {
      return JSON.stringify(pattern.value)
    }

    case "Sym": {
      return pattern.value
    }
  }
}
