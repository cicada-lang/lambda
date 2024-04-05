import dedent from "dedent"
import { envEmpty } from "../env/index.js"
import { equivalent, EquivalentCtx } from "../equivalent/index.js"
import { evaluate } from "../evaluate/index.js"
import { type Exp } from "../exp/index.js"
import { formatExp } from "../format/formatExp.js"
import type { Mod } from "../mod/Mod.js"

export function assertEqual(mod: Mod, left: Exp, right: Exp): void {
  const leftValue = evaluate(mod, envEmpty(), left)
  const rightValue = evaluate(mod, envEmpty(), right)
  if (!equivalent(EquivalentCtx.init(), leftValue, rightValue)) {
    throw new Error(dedent`
      [assertEqual] Fail to assert equal.
      
        left: ${formatExp(left)}
        right: ${formatExp(right)}
      `)
  }
}
