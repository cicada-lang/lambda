import { InternalError } from "../errors/index.ts"

export interface ParserOptions {
  quotes: Array<{ mark: string; symbol: string }>
  brackets: Array<{ start: string; end: string }>
  comments: Array<string>
  nulls?: Array<string>
}

export class ParserConfig {
  quotes: Array<{ mark: string; symbol: string }>
  brackets: Array<{ start: string; end: string }>
  comments: Array<string>
  nulls: Array<string>
  marks: Array<string>

  constructor(options: ParserOptions) {
    this.quotes = options.quotes
    this.brackets = options.brackets
    this.comments = options.comments
    this.nulls = options.nulls ?? []
    this.marks = [
      ...options.quotes.map(({ mark }) => mark),
      ...options.brackets.flatMap(({ start, end }) => [start, end]),
    ]
  }

  isNull(value: string): boolean {
    return this.nulls.some((x) => x === value)
  }

  isMark(value: string): boolean {
    return this.marks.some((x) => x === value)
  }

  matchBrackets(start: string, end: string): boolean {
    const found = this.brackets.find((entry) => entry.start === start)
    if (found === undefined) {
      return false
    }

    return found.end === end
  }

  findQuoteSymbolOrFail(mark: string): string {
    const found = this.quotes.find((entry) => entry.mark === mark)
    if (found === undefined) {
      throw new InternalError(`Fail to find quote symbol for mark: ${mark}`)
    }

    return found.symbol
  }
}
