import { Stmt } from "../stmt"

export type StmtEntry = {
  stmt: Stmt
  output?: string
}

export class Block {
  constructor(
    public id: number,
    public code: string,
    public entries: Array<StmtEntry>
  ) {}

  get outputs(): Array<string | undefined> {
    return this.entries.map(({ output }) => output)
  }
}
