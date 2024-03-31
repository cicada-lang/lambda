import { envEmpty } from "../env/index.js"
import { equivalent, EquivalentCtx } from "../equivalent/index.js"
import { evaluate } from "../evaluate/index.js"
import * as Exps from "../exp/index.js"
import { type Exp } from "../exp/index.js"
import { formatExp } from "../format/formatExp.js"
import { modDefine, modFind, modResolve } from "../mod/index.js"
import type { Mod } from "../mod/Mod.js"
import { readback, ReadbackCtx } from "../readback/index.js"
import type { Define, Stmt } from "../stmt/Stmt.js"
import { executeMod } from "./executeMod.js"

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

    case "Define": {
      assertAllNamesDefined(mod, stmt)

      modDefine(mod, stmt.name, {
        mod,
        name: stmt.name,
        exp: stmt.exp,
      })

      return null
    }

    case "Import": {
      const url = modResolve(mod, stmt.path)
      if (url.href === mod.url.href) {
        throw new Error(`I can not circular import: ${stmt.path}`)
      }

      const found = mod.loadedMods.get(url.href)
      if (found === undefined) {
        throw new Error(`Mod is not loaded: ${stmt.path}`)
      }

      executeMod(found.mod)

      for (const { name, rename } of stmt.entries) {
        const def = modFind(found.mod, name)
        if (def === undefined) {
          throw new Error(
            `I can not import undefined name: ${name}, from path: ${stmt.path}`,
          )
        }

        modDefine(mod, rename || name, def)
      }

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

function assertAllNamesDefined(mod: Mod, stmt: Define): void {
  const freeNames = Exps.freeNames(new Set([stmt.name]), stmt.exp)

  for (const name of freeNames) {
    if (modFind(mod, name) === undefined) {
      throw new Error(
        [
          `I find undefined name: ${name}`,
          `  defining: ${stmt.name}`,
          `  body: ${formatExp(stmt.exp)}`,
        ].join("\n"),
      )
    }
  }
}
