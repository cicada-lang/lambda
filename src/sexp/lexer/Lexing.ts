import { InternalError, ParsingError } from "../errors/index.ts"
import { Lexer } from "../lexer/index.ts"
import { Position } from "../position/index.ts"
import { Span } from "../span/index.ts"
import { Token, type TokenKind } from "../token/index.ts"

export class Lexing implements Iterator<Token> {
  position = Position.init()

  handlers: Array<CharHandler> = [
    // NOTE The order matters, we must
    //   try `NumberHandler` before `SymbolHandler`.
    new SpaceHandler(this),
    new QuoteHandler(this),
    new ParenthesisStartHandler(this),
    new ParenthesisEndHandler(this),
    new CommentHandler(this),
    new StringHandler(this),
    new NumberHandler(this),
    new SymbolHandler(this),
  ]

  constructor(
    public lexer: Lexer,
    public text: string,
  ) {}

  [Symbol.iterator](): Iterator<Token> {
    return this
  }

  get char(): string | undefined {
    return this.text[this.position.index]
  }

  get rest(): string {
    return this.text.slice(this.position.index)
  }

  forward(count: number): void {
    if (this.char === undefined) return

    while (count-- > 0) {
      this.position.step(this.char)
    }
  }

  next(): IteratorResult<Token> {
    while (this.char !== undefined) {
      const result = this.handleChar(this.char)
      if (result !== undefined) return result
    }

    return { done: true, value: undefined }
  }

  private handleChar(char: string): IteratorResult<Token> | undefined {
    for (const handler of this.handlers) {
      if (handler.canHandle(char)) {
        const start = new Position(this.position)
        const value = handler.handle(char)
        if (handler.kind === undefined) return undefined
        const end = new Position(this.position)
        const span = new Span(start, end)
        const token = new Token({ kind: handler.kind, value, span })
        return { done: false, value: token }
      }
    }

    throw new InternalError(`Can not handle char: ${char}`)
  }
}

abstract class CharHandler {
  constructor(public lexing: Lexing) {}

  abstract kind: TokenKind | undefined

  abstract canHandle(char: string): boolean
  abstract handle(char: string): string

  get lexer(): Lexer {
    return this.lexing.lexer
  }
}

class SpaceHandler extends CharHandler {
  kind = undefined

  canHandle(char: string): boolean {
    return char.trim() === ""
  }

  handle(char: string): string {
    let value = char
    this.lexing.forward(1)
    while (this.lexing.char !== undefined && this.lexing.char.trim() === "") {
      value += this.lexing.char
      this.lexing.forward(1)
    }

    return value
  }
}

class ParenthesisStartHandler extends CharHandler {
  kind = "ParenthesisStart" as const

  canHandle(char: string): boolean {
    return this.lexer.config.parentheses
      .map(({ start }) => start)
      .includes(char)
  }

  handle(char: string): string {
    this.lexing.forward(1)
    return char
  }
}

class ParenthesisEndHandler extends CharHandler {
  kind = "ParenthesisEnd" as const

  canHandle(char: string): boolean {
    return this.lexer.config.parentheses.map(({ end }) => end).includes(char)
  }

  handle(char: string): string {
    this.lexing.forward(1)
    return char
  }
}

class QuoteHandler extends CharHandler {
  kind = "Quote" as const

  canHandle(char: string): boolean {
    return this.lexer.config.quotes.map(({ mark }) => mark).includes(char)
  }

  handle(char: string): string {
    this.lexing.forward(1)
    return char
  }
}

class CommentHandler extends CharHandler {
  kind = undefined

  canHandle(char: string): boolean {
    const text = char + this.lexing.rest
    return this.lexer.config.comments.some((prefix) => text.startsWith(prefix))
  }

  handle(char: string): string {
    let value = char
    this.lexing.forward(1)
    while (this.lexing.char !== undefined && this.lexing.char !== "\n") {
      value += this.lexing.char
      this.lexing.forward(1)
    }

    return value
  }
}

class StringHandler extends CharHandler {
  kind = "String" as const

  canHandle(char: string): boolean {
    return char === '"'
  }

  handle(char: string): string {
    const text = this.lexing.rest.split("\n")[0] || ""
    let index = 2 // NOTE over first `"` and the folloing char.
    while (index <= text.length) {
      const head = text.slice(0, index)
      const str = this.tryToParseString(head)
      if (str === undefined) {
        index++
      } else {
        this.lexing.forward(index)
        return head
      }
    }

    const start = new Position(this.lexing.position)
    const end = new Position(this.lexing.position)
    end.step('"')
    const span = new Span(start, end)
    throw new ParsingError(`Fail to parse JSON string: ${text}`, span)
  }

  private tryToParseString(text: string): string | undefined {
    try {
      return JSON.parse(text)
    } catch (error) {
      return undefined
    }
  }
}

class NumberHandler extends CharHandler {
  kind = "Number" as const

  canHandle(char: string): boolean {
    const text = this.lexing.rest.split("\n")[0] || ""
    return this.lastSuccessAt(text) !== undefined
  }

  handle(char: string): string {
    const text = this.lexing.rest.split("\n")[0] || ""
    const index = this.lastSuccessAt(text)
    if (index === undefined) {
      throw new InternalError(`Expect to find lastSuccessAt in text: ${text}`)
    }

    this.lexing.forward(index)
    return text.slice(0, index)
  }

  private lastSuccessAt(text: string): number | undefined {
    let index = 0
    let lastSuccessAt: number | undefined = undefined
    while (index <= text.length) {
      const head = text.slice(0, index)
      const result = this.tryToParseNumber(head)
      if (
        result !== undefined &&
        text[index - 1] !== undefined &&
        text[index - 1].trim() !== "" &&
        (text[index] === undefined ||
          text[index].trim() === "" ||
          this.lexer.config.isMark(text[index]))
      ) {
        lastSuccessAt = index
      }

      index++
    }

    return lastSuccessAt
  }

  private tryToParseNumber(text: string): number | undefined {
    try {
      const value = JSON.parse(text)
      if (typeof value === "number") return value
      else return undefined
    } catch (error) {
      return undefined
    }
  }
}

class SymbolHandler extends CharHandler {
  kind = "Symbol" as const

  canHandle(char: string): boolean {
    return true
  }

  handle(char: string): string {
    let value = char
    this.lexing.forward(1)
    while (
      this.lexing.char !== undefined &&
      this.lexing.char.trim() !== "" &&
      !this.lexer.config.marks.includes(this.lexing.char)
    ) {
      value += this.lexing.char
      this.lexing.forward(1)
    }

    return value
  }
}
