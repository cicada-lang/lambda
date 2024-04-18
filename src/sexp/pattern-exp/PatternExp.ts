export type PatternExp =
  | string
  | number
  | StrExp
  | ConsExp
  | ListExp
  | Array<PatternExp>
  | VarExp

export type StrExp = {
  family: "PatternExp"
  kind: "StrExp"
  value: string
}

export function str(value: string): StrExp {
  return {
    family: "PatternExp",
    kind: "StrExp",
    value,
  }
}

export type ConsExp = {
  family: "PatternExp"
  kind: "ConsExp"
  head: PatternExp
  tail: PatternExp
}

export function cons(head: PatternExp, tail: PatternExp): ConsExp {
  return {
    family: "PatternExp",
    kind: "ConsExp",
    head,
    tail,
  }
}

export type ListExp = {
  family: "PatternExp"
  kind: "ListExp"
  exps: Array<PatternExp>
  end?: PatternExp
}

export function list(exps: Array<PatternExp>, end?: PatternExp): ListExp {
  return {
    family: "PatternExp",
    kind: "ListExp",
    exps,
    end,
  }
}

export type VarExp = {
  family: "PatternExp"
  kind: "VarExp"
  name: string
}

export function v(name: string): VarExp {
  return {
    family: "PatternExp",
    kind: "VarExp",
    name,
  }
}
