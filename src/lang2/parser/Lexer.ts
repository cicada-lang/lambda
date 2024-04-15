import execWithIndices from "regexp-match-indices"
import { spanShift } from "./Span.js"
import type { Token } from "./Token.js"
import type { TokenTable } from "./TokenTable.js"

export type Lexer = (text: string) => Array<Token>

export function createLexer(table: TokenTable): Lexer {
  for (const [label, regexp] of Object.entries(table)) {
    if (regexp.global) {
      throw new Error(
        [
          "[createLexer] Can not use global RegExp.",
          `  label: ${label}\n`,
          `  regexp: ${regexp.toString()}`,
        ].join("\n"),
      )
    }
  }

  return (text) => {
    const tokens: Array<Token> = new Array()

    let i = 0

    while (i < text.length) {
      const remain = text.slice(i)
      const result = matchTable(remain, table)
      if (result !== undefined) {
        const { label, value, span, forword } = result

        if (forword === 0) {
          throw new Error(
            [
              `[createLexer/lexer] No progress during at: ${i}`,
              `  remain: ${reportRemain(remain)}`,
              `  label: ${result.label}`,
            ].join("\n"),
          )
        }

        tokens.push({ label, value, span: spanShift(span, i) })

        i += forword
      } else {
        throw new Error(
          [
            "[createLexer/lexer] All regexp in table fail to match remaining input.",
            `- index: ${i}`,
            `- remain: ${reportRemain(remain)}`,
            `- labels: ${Object.keys(table)
              .map(([label]) => label)
              .join(", ")}`,
          ].join("\n"),
        )
      }
    }

    return tokens
  }
}

function reportRemain(remain: string): string {
  let s = ""
  s += remain.slice(0, 20).replace(/\n/g, "\\n")
  s += " ..."
  return s
}

function matchTable(
  text: string,
  table: TokenTable,
): undefined | (Token & { forword: number }) {
  for (const [label, regexp] of Object.entries(table)) {
    const result = execWithIndices(regexp, text)
    if (result !== null) {
      // NOTE The first capture is viewed as the value of the token.
      const value = result[1]
      if (value !== undefined) {
        const main = result[0]
        const forword = main.length
        const [lo, hi] = result.indices[1]
        const span = { lo, hi }
        return { label, value, span, forword }
      }
    }
  }
}
