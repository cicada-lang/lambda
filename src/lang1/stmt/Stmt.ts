import { type Exp } from "../exp/index.js"

export type Stmt = Compute | Define

export type Compute = {
  "@type": "Stmt"
  "@kind": "Compute"
  exp: Exp
}

export type Define = {
  "@type": "Stmt"
  "@kind": "Define"
  name: string
  exp: Exp
}
