import { type Exp } from "../exp/index.js"

export type Stmt = Compute | Define

export type Compute = {
  "@type": "Stmt"
  "@kind": "Compute"
  exp: Exp
}

export function Compute(exp: Exp): Compute {
  return {
    "@type": "Stmt",
    "@kind": "Compute",
    exp,
  }
}

export type Define = {
  "@type": "Stmt"
  "@kind": "Define"
  name: string
  exp: Exp
}

export function Define(name: string, exp: Exp): Define {
  return {
    "@type": "Stmt",
    "@kind": "Define",
    name,
    exp,
  }
}
