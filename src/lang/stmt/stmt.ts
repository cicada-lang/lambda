import { Mod } from "../mod"
import { Span } from "../parser/span"

export abstract class Stmt {
  abstract span: Span
  abstract execute(mod: Mod): Promise<void>
}
