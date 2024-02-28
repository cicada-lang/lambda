import { type Binding, type Exp } from "../exp/index.js"

export function formatExp(exp: Exp): string {
  switch (exp["@kind"]) {
    case "Var": {
      return exp.name
    }

    case "Fn": {
      return `(lambda (${exp.name}) ${formatExp(exp.ret)})`
    }

    case "Ap": {
      return `(${formatExp(exp.target)} ${formatExp(exp.arg)})`
    }

    case "Let": {
      const bindings = exp.bindings.map(formatBinding)
      return `(let (${bindings.join(" ")}) ${formatExp(exp.body)})`
    }
  }
}

function formatBinding(binding: Binding): string {
  return `(${binding.name} ${formatExp(binding.exp)})`
}
