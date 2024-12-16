import { Position } from "../position/index.ts"
import { color, type ColorMode } from "../utils/color.ts"
import { intervalOverlap } from "../utils/interval.ts"
import { isBrowser } from "../utils/isBrowser.ts"

export class Span {
  constructor(
    public start: Position,
    public end: Position,
  ) {}

  get lo(): number {
    return this.start.index
  }

  get hi(): number {
    return this.end.index
  }

  union(that: Span): Span {
    const start = this.start.index < that.start.index ? this.start : that.start
    const end = this.end.index > that.end.index ? this.end : that.end
    return new Span(start, end)
  }

  report(context: string): string {
    let s = repr_in_context(this, context)
    s = decorate_line_number(s)
    s = line_span_focus(to_line_span_in_context(this, context), s, 3)
    return s
  }
}

// TODO The code is copied from `@cicada-lang/partech`,
//   in need of refactoring.

const color_mode: ColorMode = isBrowser() ? "html" : "escape-code"

function repr_in_context(
  span: Span,
  context: string,
  opts: {
    mode: ColorMode
  } = {
    mode: color_mode,
  },
): string {
  let s = ""
  for (let i = 0; i < context.length; i++) {
    if (span.lo <= i && i < span.hi) {
      s += color(context.charAt(i), { ...opts, background: "red" })
    } else {
      s += context.charAt(i)
    }
  }
  // NOTE END_OF_FILE
  if (span.lo === context.length && span.hi === context.length) {
    s += color(" ", { ...opts, background: "red" })
  }
  return s
}

function decorate_line_number(text: string): string {
  let lines = text.split("\n")
  let max = lines.length + 1
  let width = max.toString().length
  let decorated = ""
  for (const [i, line] of lines.entries()) {
    let line_number = i + 1 // NOTE index from 1 instead of 0
    let line_number_string = line_number.toString()
    line_number_string =
      " ".repeat(width - line_number_string.length) + line_number_string
    decorated += " "
    decorated += line_number_string
    decorated += " |"
    decorated += line
    decorated += "\n"
  }
  return decorated
}

function to_line_span_in_context(
  span: Span,
  context: string,
): { lo: number; hi: number } {
  let line_indexes = new Set<number>()
  let cursor = 0
  let lines = context.split("\n")
  for (let [i, line] of lines.entries()) {
    if (intervalOverlap(span.lo, span.hi, cursor, cursor + line.length + 1)) {
      line_indexes.add(i)
    }
    cursor += line.length + 1
  }
  const lo = Math.min(...line_indexes)
  const hi = Math.max(...line_indexes)
  return { lo, hi }
}

function line_span_focus(
  span: { lo: number; hi: number },
  context: string,
  margin: number,
): string {
  let lines = context.split("\n")
  return lines.slice(Math.max(0, span.lo - margin), span.hi + margin).join("\n")
}
