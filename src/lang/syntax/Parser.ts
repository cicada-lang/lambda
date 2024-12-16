import { Parser as SexpParser } from "../../sexp/index.ts"
import { type Stmt } from "../stmt/index.ts"
import { matchStmt } from "./matchStmt.ts"

export class Parser extends SexpParser {
  constructor() {
    super({
      quotes: [
        { mark: "'", symbol: "quote" },
        { mark: ",", symbol: "unquote" },
        { mark: "`", symbol: "quasiquote" },
      ],
      parentheses: [
        { start: "(", end: ")" },
        { start: "[", end: "]" },
      ],
      comments: [";"],
    })
  }

  parseStmts(text: string): Array<Stmt> {
    return this.parseSexps(text).map(matchStmt)
  }
}
