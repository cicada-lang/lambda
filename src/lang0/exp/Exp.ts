export type Exp = Var | Fn | Ap

export type Var = {
  "@type": "Exp"
  "@kind": "Var"
  name: string
}

export function Var(name: string): Var {
  return {
    "@type": "Exp",
    "@kind": "Var",
    name,
  }
}

export type Fn = {
  "@type": "Exp"
  "@kind": "Fn"
  name: string
  ret: Exp
}

export function Fn(name: string, ret: Exp): Fn {
  return {
    "@type": "Exp",
    "@kind": "Fn",
    name,
    ret,
  }
}

export type Ap = {
  "@type": "Exp"
  "@kind": "Ap"
  target: Exp
  arg: Exp
}

export function Ap(target: Exp, arg: Exp): Ap {
  return {
    "@type": "Exp",
    "@kind": "Ap",
    target,
    arg,
  }
}
