import { type Exp } from "../exp/index.js"
import { type Substitution } from "../substitution/index.js"

export function lookup(
  name: string,
  substitution: Substitution,
): Exp | undefined {
  for (const binding of substitution.values()) {
    if (binding.name === name) {
      return binding.exp
    }
  }

  return undefined
}
