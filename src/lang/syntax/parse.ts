import { Parser as SexpParser } from "../../sexp/index.ts"
import { type Stmt } from "../stmt/index.ts"
import { matchStmt } from "./matchStmt.ts"

class Parser extends SexpParser {
  constructor() {
    super({
      quotes: [
        { mark: "'", symbol: "quote" },
        { mark: ",", symbol: "unquote" },
        { mark: "`", symbol: "quasiquote" },
      ],
      brackets: [
        { start: "(", end: ")" },
        { start: "[", end: "]" },
      ],
      comments: [";"],
    })
  }
}

export function parseStmts(text: string): Array<Stmt> {
  const parser = new Parser()
  return parser.parseSexps(text).map(matchStmt)
}
