import type { Definition } from "../definition/Definition.js"
import * as Exps from "../exp/index.js"
import { formatExp } from "../format/formatExp.js"
import { modFind, type Mod } from "../mod/index.js"

export function assertAllNamesDefined(mod: Mod, definition: Definition): void {
  const freeNames = Exps.freeNames(new Set([definition.name]), definition.exp)

  for (const name of freeNames) {
    if (modFind(mod, name) === undefined) {
      throw new Error(
        [
          `I find undefined name: ${name}`,
          `  defining: ${definition.name}`,
          `  body: ${formatExp(definition.exp)}`,
        ].join("\n"),
      )
    }
  }
}
