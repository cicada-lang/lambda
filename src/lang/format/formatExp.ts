import type { Binding } from "../../lang/substitution/index.ts"
import { type Exp } from "../exp/index.ts"
import { substitutionBindings } from "../substitution/Substitution.ts"

export function formatExp(exp: Exp): string {
  switch (exp["@kind"]) {
    case "Var": {
      return exp.name
    }

    case "Fn": {
      const { names, ret } = formatFn([exp.name], exp.ret)
      return `(lambda (${names.join(" ")}) ${ret})`
    }

    case "FnRecursive": {
      const { names, ret } = formatFn([exp.name], exp.ret)
      return `(lambda (${names.join(" ")}) ${ret})`
    }

    case "Ap": {
      const { target, args } = formatAp(exp.target, [formatExp(exp.arg)])
      return `(${target} ${args.join(" ")})`
    }

    case "Let": {
      const bindings = substitutionBindings(exp.substitution).map(formatBinding)
      return `(let (${bindings.join(" ")}) ${formatExp(exp.body)})`
    }
  }
}

function formatFn(
  names: Array<string>,
  ret: Exp,
): { names: Array<string>; ret: string } {
  if (ret["@kind"] === "Fn") {
    return formatFn([...names, ret.name], ret.ret)
  } else {
    return { names, ret: formatExp(ret) }
  }
}

function formatAp(
  target: Exp,
  args: Array<string>,
): { target: string; args: Array<string> } {
  if (target["@kind"] === "Ap") {
    return formatAp(target.target, [formatExp(target.arg), ...args])
  } else {
    return { target: formatExp(target), args }
  }
}

function formatBinding(binding: Binding): string {
  return `[${binding.name} ${formatExp(binding.exp)}]`
}
