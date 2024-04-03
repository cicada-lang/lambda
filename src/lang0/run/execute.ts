import { envEmpty } from "../env/index.js"
import { equivalent, EquivalentCtx } from "../equivalent/index.js"
import { evaluate } from "../evaluate/index.js"
import * as Exps from "../exp/index.js"
import { type Exp } from "../exp/index.js"
import { formatExp } from "../format/formatExp.js"
import { modFind } from "../mod/index.js"
import type { Mod } from "../mod/Mod.js"
import { readback, ReadbackCtx } from "../readback/index.js"
import type { Define, Stmt } from "../stmt/Stmt.js"

export function execute(mod: Mod, stmt: Stmt): null | string {
  switch (stmt["@kind"]) {
    case "AssertEqual": {
      for (let i = 0; i < stmt.exps.length - 1; i++) {
        assertEqual(mod, stmt.exps[i], stmt.exps[i + 1])
      }

      return null
    }

    case "AssertNotEqual": {
      for (let i = 0; i < stmt.exps.length - 1; i++) {
        assertNotEqual(mod, stmt.exps[i], stmt.exps[i + 1])
      }

      return null
    }

    case "Compute": {
      const value = evaluate(mod, envEmpty(), stmt.exp)
      const exp = readback(ReadbackCtx.init(), value)
      return formatExp(exp)
    }

    default: {
      return null
    }
  }
}

function assertEqual(mod: Mod, left: Exp, right: Exp): void {
  const leftValue = evaluate(mod, envEmpty(), left)
  const rightValue = evaluate(mod, envEmpty(), right)
  if (!equivalent(EquivalentCtx.init(), leftValue, rightValue)) {
    throw new Error(
      `((fail assert-equal) ${formatExp(left)} ${formatExp(right)})`,
    )
  }
}

function assertNotEqual(mod: Mod, left: Exp, right: Exp): void {
  const leftValue = evaluate(mod, envEmpty(), left)
  const rightValue = evaluate(mod, envEmpty(), right)
  if (equivalent(EquivalentCtx.init(), leftValue, rightValue)) {
    throw new Error(
      `((fail assert-not-equal) ${formatExp(left)} ${formatExp(right)})`,
    )
  }
}
