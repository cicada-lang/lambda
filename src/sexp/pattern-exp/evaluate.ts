import { InternalError } from "../errors/index.ts"
import { type PatternExp } from "../pattern-exp/index.ts"
import * as Patterns from "../pattern/index.ts"
import { type Pattern } from "../pattern/index.ts"

export function evaluate(exp: PatternExp): Pattern {
  if (typeof exp === "number") {
    return Patterns.Num(exp)
  }

  if (typeof exp === "string") {
    return Patterns.Sym(exp)
  }

  if (exp instanceof Array) {
    let pattern: Pattern = Patterns.Null()

    for (const head of [...exp].reverse()) {
      pattern = Patterns.Cons(evaluate(head), pattern)
    }

    return pattern
  }

  if (exp.kind === "ListExp") {
    let pattern = exp.end ? evaluate(exp.end) : Patterns.Null()

    for (const head of [...exp.exps].reverse()) {
      pattern = Patterns.Cons(evaluate(head), pattern)
    }

    return pattern
  }

  if (exp.kind === "StrExp") {
    return Patterns.Str(exp.value)
  }

  if (exp.kind === "VarExp") {
    return Patterns.Var(exp.name)
  }

  if (exp.kind === "ConsExp") {
    return Patterns.Cons(evaluate(exp.head), evaluate(exp.tail))
  }

  throw new InternalError(`Unknown pattern exp: ${exp}`)
}
