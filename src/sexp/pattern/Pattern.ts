import { ParsingError } from "../errors/index.ts"
import { type Sexp } from "../sexp/index.ts"
import { equal } from "../utils/equal.ts"

export type Pattern = Var | Cons | Null | Num | Str | Sym

export type Var = {
  family: "Pattern"
  kind: "Var"
  name: string
}

export function Var(name: string): Var {
  return {
    family: "Pattern",
    kind: "Var",
    name,
  }
}

export type Null = {
  family: "Pattern"
  kind: "Null"
}

export function Null(): Null {
  return {
    family: "Pattern",
    kind: "Null",
  }
}

export type Cons = {
  family: "Pattern"
  kind: "Cons"
  head: Pattern
  tail: Pattern
}

export function Cons(head: Pattern, tail: Pattern): Cons {
  return {
    family: "Pattern",
    kind: "Cons",
    head,
    tail,
  }
}

export type Num = {
  family: "Pattern"
  kind: "Num"
  value: number
}

export function Num(value: number): Num {
  return {
    family: "Pattern",
    kind: "Num",
    value,
  }
}

export type Str = {
  family: "Pattern"
  kind: "Str"
  value: string
}

export function Str(value: string): Str {
  return {
    family: "Pattern",
    kind: "Str",
    value,
  }
}

export type Sym = {
  family: "Pattern"
  kind: "Sym"
  value: string
}

export function Sym(value: string): Sym {
  return {
    family: "Pattern",
    kind: "Sym",
    value,
  }
}

export function matchOrFail(
  pattern: Pattern,
  sexp: Sexp,
  results: Record<string, Sexp>,
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

      results = matchOrFail(pattern.head, sexp.head, results)
      results = matchOrFail(pattern.tail, sexp.tail, results)

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

export function match(
  pattern: Pattern,
  sexp: Sexp,
  results: Record<string, Sexp>,
): Record<string, Sexp> | undefined {
  try {
    return matchOrFail(pattern, sexp, results)
  } catch (error) {
    if (error instanceof ParsingError) return undefined
    else throw error
  }
}
