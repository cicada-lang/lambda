import { Stmt } from "../stmt"

export type StmtEntry = {
  stmt: Stmt
  output?: string
}

export class Block {
  constructor(
    public id: number,
    public code: string,
    public stmts: Array<StmtEntry>
  ) {}
}
