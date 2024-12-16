import type { Exp } from "../exp/index.ts"

export type Binding = {
  name: string
  exp: Exp
}

export type Substitution = Map<string, Binding>

export function substitutionIsEmpty(substitution: Substitution): boolean {
  return substitution.size === 0
}

export function substitutionFromBindings(
  bindings: Array<Binding>,
): Substitution {
  return new Map([
    ...bindings.map<[string, Binding]>((binding) => [binding.name, binding]),
  ])
}

export function substitutionBindings(
  substitution: Substitution,
): Array<Binding> {
  return Array.from(substitution.values())
}

export function substitutionInitial(name: string, exp: Exp): Substitution {
  return new Map([[name, { name, exp }]])
}

export function substitutionExtend(
  substitution: Substitution,
  name: string,
  exp: Exp,
): Substitution {
  return new Map([...substitution, [name, { name, exp }]])
}

export function substitutionMerge(
  left: Substitution,
  right: Substitution,
): Substitution {
  return new Map([...left, ...right])
}

export function substitutionMapExp(
  substitution: Substitution,
  f: (exp: Exp) => Exp,
): Substitution {
  return new Map([
    ...Array.from(substitution.values()).map<[string, Binding]>(
      ({ name, exp }) => [name, { name, exp: f(exp) }],
    ),
  ])
}

export function substitutionTakeNames(
  substitution: Substitution,
  names: Set<string>,
): Substitution {
  const newSubstitution = new Map()
  for (const [name, exp] of substitution) {
    if (names.has(name)) {
      newSubstitution.set(name, exp)
    }
  }

  return newSubstitution
}
