import { formatSexp, type Sexp } from "../sexp/index.ts"

export function unfoldFormatCons(sexp: Sexp): {
  heads: Array<string>
  tail?: string
} {
  switch (sexp.kind) {
    case "Cons": {
      const head = formatSexp(sexp.head)
      const { heads, tail } = unfoldFormatCons(sexp.tail)
      return { heads: [head, ...heads], tail }
    }

    case "Null": {
      return { heads: [], tail: undefined }
    }

    default: {
      return { heads: [], tail: formatSexp(sexp) }
    }
  }
}
