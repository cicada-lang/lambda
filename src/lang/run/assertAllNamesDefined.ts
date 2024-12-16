import type { Definition } from "../definition/Definition.ts"
import { formatExp } from "../format/formatExp.ts"
import { modFind, type Mod } from "../mod/index.ts"

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
