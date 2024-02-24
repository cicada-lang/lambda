export type Exp = Var | Fn | Ap | Let

export type Var = {
  "@type": "Exp"
  "@kind": "Var"
  name: string
}

export type Fn = {
  "@type": "Exp"
  "@kind": "Fn"
  name: string
  ret: Exp
}

export type Ap = {
  "@type": "Exp"
  "@kind": "Ap"
  target: Exp
  arg: Exp
}

export type Binding = {
  name: string
  exp: Exp
}

export type Let = {
  "@type": "Exp"
  "@kind": "Let"
  bindings: Array<Binding>
  body: Exp
}
