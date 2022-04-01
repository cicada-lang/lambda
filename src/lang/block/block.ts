import { Stmt } from "../stmt"

export class Block {
  constructor(
    public id: number,
    public code: string,
    public stmts: Array<{ stmt: Stmt; output?: string }>
  ) {}
}
