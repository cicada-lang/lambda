import { ParsingError } from "../errors/index.ts"
import { evaluate, type PatternExp } from "../pattern-exp/index.ts"
import { formatPattern, matchPattern, type Pattern } from "../pattern/index.ts"
import { formatSexp, type Sexp } from "../sexp/index.ts"
import { Span } from "../span/index.ts"

export function matchSymbol(sexp: Sexp): string {
  if (sexp.kind !== "Sym") {
    throw new ParsingError(
      `I expect the sexp to be a symbol: ${formatSexp(sexp)}`,
      sexp.span,
    )
  }

  return sexp.value
}

export function matchString(sexp: Sexp): string {
  if (sexp.kind !== "Str") {
    throw new ParsingError(
      `I expect the sexp to be a string: ${formatSexp(sexp)}`,
      sexp.span,
    )
  }

  return sexp.value
}

export function matchNumber(sexp: Sexp): number {
  if (sexp.kind !== "Num") {
    throw new ParsingError(
      `I expect the sexp to be a number: ${formatSexp(sexp)}`,
      sexp.span,
    )
  }

  return sexp.value
}

export function matchList<A>(sexp: Sexp, matcher: (sexp: Sexp) => A): Array<A> {
  if (sexp.kind === "Null") {
    return []
  }

  if (sexp.kind === "Cons") {
    return [matcher(sexp.head), ...matchList(sexp.tail, matcher)]
  }

  throw new ParsingError(
    `[matchList] I expect the sexp to be a list: ${formatSexp(sexp)}`,
    sexp.span,
  )
}

export function listToArray<A>(sexp: Sexp): Array<Sexp> {
  if (sexp.kind === "Null") {
    return []
  }

  if (sexp.kind === "Cons") {
    return [sexp.head, ...listToArray(sexp.tail)]
  }

  throw new ParsingError(
    `[listToArray] I expect the sexp to be a list: ${formatSexp(sexp)}`,
    sexp.span,
  )
}

export type Rule<A> = [
  PatternExp,
  (results: Record<string, Sexp>, options: { span: Span }) => A,
]

export function match<A>(sexp: Sexp, rules: Array<Rule<A>>): A {
  const patterns: Array<Pattern> = []
  for (const [patternExp, f] of rules) {
    const pattern = evaluate(patternExp)
    patterns.push(pattern)
    const results = matchPattern(pattern, sexp)
    if (results !== undefined) {
      return f(results, { span: sexp.span })
    }
  }

  const formatedPatterns = patterns
    .map(formatPattern)
    .map((s) => "  " + s)
    .join("\n")

  const message = [
    `Fail to match sexp: ${formatSexp(sexp)}`,
    `Patterns:`,
    `${formatedPatterns}`,
  ]

  throw new ParsingError(message.join("\n"), sexp.span)
}
