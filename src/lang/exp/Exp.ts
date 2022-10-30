export type Exp = Var | Fn | Ap | Fixpoint

export type Var = {
  family: "Exp"
  kind: "Var"
  name: string
}

export function Var(name: string): Var {
  return {
    family: "Exp",
    kind: "Var",
    name,
  }
}

export type Fn = {
  family: "Exp"
  kind: "Fn"
  name: string
  ret: Exp
}

export function Fn(name: string, ret: Exp): Fn {
  return {
    family: "Exp",
    kind: "Fn",
    name,
    ret,
  }
}

export type Ap = {
  family: "Exp"
  kind: "Ap"
  target: Exp
  arg: Exp
}

export function Ap(target: Exp, arg: Exp): Ap {
  return {
    family: "Exp",
    kind: "Ap",
    target,
    arg,
  }
}

export type Fixpoint = {
  family: "Exp"
  kind: "Fixpoint"
  name: string
  body: Exp
}

export function Fixpoint(name: string, body: Exp): Fixpoint {
  return {
    family: "Exp",
    kind: "Fixpoint",
    name,
    body,
  }
}
