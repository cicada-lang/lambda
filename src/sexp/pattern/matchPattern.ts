import { ParsingError } from "../errors/index.ts"
import { type Pattern } from "../pattern/index.ts"
import { type Sexp } from "../sexp/index.ts"
import { equal } from "../utils/equal.ts"

export function matchPatternOrFail(
  pattern: Pattern,
  sexp: Sexp,
  results: Record<string, Sexp> = {},
): Record<string, Sexp> {
  switch (pattern.kind) {
    case "Var": {
      const found = results[pattern.name]
      if (found !== undefined) {
        if (!equal(found, sexp)) {
          throw new ParsingError(
            `I expect the sexp to be equal to ${found}, but it is ${sexp}`,
            sexp.span,
          )
        }

        return results
      }

      return { ...results, [pattern.name]: sexp }
    }

    case "Null": {
      if (sexp.kind !== "Null") {
        throw new ParsingError(`I expect the sexp to be a null`, sexp.span)
      }

      return results
    }

    case "Cons": {
      if (sexp.kind !== "Cons") {
        throw new ParsingError(`I expect the sexp to be a cons`, sexp.span)
      }

      results = matchPatternOrFail(pattern.head, sexp.head, results)
      results = matchPatternOrFail(pattern.tail, sexp.tail, results)

      return results
    }

    case "Num": {
      if (sexp.kind !== "Num") {
        throw new ParsingError(`I expect the sexp to be a number`, sexp.span)
      }

      if (!(sexp.value === pattern.value)) {
        throw new ParsingError(
          `I expect the sexp to be equal to ${pattern.value}, but it is ${sexp.value}`,
          sexp.span,
        )
      }

      return results
    }

    case "Str": {
      if (!(sexp.kind === "Str")) {
        throw new ParsingError(`I expect the sexp to be a string`, sexp.span)
      }

      if (!(sexp.value === pattern.value)) {
        throw new ParsingError(
          `I expect the sexp to be equal to ${pattern.value}, but it is ${sexp.value}`,
          sexp.span,
        )
      }

      return results
    }

    case "Sym": {
      if (sexp.kind !== "Sym") {
        throw new ParsingError(`I expect the sexp to be a symbol`, sexp.span)
      }

      if (!(sexp.value === pattern.value)) {
        throw new ParsingError(
          `I expect the sexp to be equal to ${pattern.value}, but it is ${sexp.value}`,
          sexp.span,
        )
      }

      return results
    }
  }
}

export function matchPattern(
  pattern: Pattern,
  sexp: Sexp,
  results: Record<string, Sexp> = {},
): Record<string, Sexp> | undefined {
  try {
    return matchPatternOrFail(pattern, sexp, results)
  } catch (error) {
    if (error instanceof ParsingError) return undefined
    else throw error
  }
}
