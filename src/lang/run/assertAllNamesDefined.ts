import type { Definition } from "../definition/Definition.js"
import { formatExp } from "../format/formatExp.js"
import { modFind, type Mod } from "../mod/index.js"

export function assertAllNamesDefined(mod: Mod, definition: Definition): void {
  for (const name of definition.freeNames) {
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
