import { type Binding, type Exp } from "../exp/index.js"

export function lookup(
  name: string,
  bindings: Array<Binding>,
): Exp | undefined {
  for (const binding of bindings) {
    if (binding.name === name) {
      return binding.exp
    }
  }

  return undefined
}
