import { Exp } from "../exp"

export class Var extends Exp {
  constructor(public name: string) {
    super()
  }
}
