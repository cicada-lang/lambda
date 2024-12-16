import { unfoldFormatCons, type Sexp } from "../sexp/index.ts"

export function formatSexp(sexp: Sexp): string {
  switch (sexp.kind) {
    case "Cons":
    case "Null": {
      const { heads, tail } = unfoldFormatCons(sexp)
      return tail ? `(${heads.join(" ")} . ${tail})` : `(${heads.join(" ")})`
    }

    case "Num": {
      return sexp.value.toString()
    }

    case "Str": {
      return JSON.stringify(sexp.value)
    }

    case "Sym": {
      return sexp.value
    }
  }
}
