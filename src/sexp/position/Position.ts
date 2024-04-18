export class Position {
  index: number
  column: number
  row: number

  constructor(options: { index: number; column: number; row: number }) {
    this.index = options.index
    this.column = options.column
    this.row = options.row
  }

  static init(): Position {
    return new Position({ index: 0, column: 0, row: 0 })
  }

  step(char: string): void {
    if (char.length !== 1) {
      throw new Error(`I expect the char to be length of one: ${char}`)
    }

    this.index++

    if (char === "\n") {
      this.column = 0
      this.row++
    } else {
      this.column++
    }
  }
}
