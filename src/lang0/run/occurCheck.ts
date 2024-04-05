import dedent from "dedent"
import type { Definition } from "../definition/Definition.js"
import { expIndirectFreeNames } from "../exp/expIndirectFreeNames.js"
import * as Exps from "../exp/index.js"
import { formatExp } from "../format/formatExp.js"
import type { Mod } from "../mod/index.js"

export function occurCheck(mod: Mod, definition: Definition): void {
  const indirectFreeNames = expIndirectFreeNames(mod, definition.exp)

  if (!indirectFreeNames.has(definition.name)) return

  if (definition.exp["@kind"] !== "Fn") {
    throw new Error(dedent`
      [occurCheck] Only function can be recursive.

        non-function exp: ${formatExp(definition.exp)}
        recursive name: ${definition.name}
      `)
  }

  definition.exp = Exps.FnRecursive(
    definition.name,
    definition.exp.name,
    definition.exp.ret,
  )
}
