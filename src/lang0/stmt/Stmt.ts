import { type Exp } from "../exp/Exp.js"

export type Stmt = AssertEqual | AssertNotEqual | Compute | Define | Import

export type AssertEqual = {
  "@type": "Stmt"
  "@kind": "AssertEqual"
  exps: Array<Exp>
}

export function AssertEqual(exps: Array<Exp>): AssertEqual {
  return {
    "@type": "Stmt",
    "@kind": "AssertEqual",
    exps,
  }
}

export type AssertNotEqual = {
  "@type": "Stmt"
  "@kind": "AssertNotEqual"
  exps: Array<Exp>
}

export function AssertNotEqual(exps: Array<Exp>): AssertNotEqual {
  return {
    "@type": "Stmt",
    "@kind": "AssertNotEqual",
    exps,
  }
}

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

export type ImportEntry = {
  name: string
  rename?: string
}

export type Import = {
  "@type": "Stmt"
  "@kind": "Import"
  path: string
  entries: Array<ImportEntry>
}

export function Import(path: string, entries: Array<ImportEntry>): Import {
  return {
    "@type": "Stmt",
    "@kind": "Import",
    path,
    entries,
  }
}
