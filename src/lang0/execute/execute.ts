import { builtinNames } from "../builtin/index.js"
import { Env } from "../env/index.js"
import { equivalent, EquivalentCtx } from "../equivalent/index.js"
import * as Errors from "../errors/index.js"
import { AssertionError, LangError } from "../errors/index.js"
import { evaluate } from "../evaluate/index.js"
import * as Exps from "../exp/index.js"
import { type Exp } from "../exp/index.js"
import { formatExp } from "../format/formatExp.js"
import { modDefine, modFind, modResolve } from "../mod/index.js"
import type { Mod } from "../mod/Mod.js"
import { readback, ReadbackCtx } from "../readback/index.js"
import type { Define, Stmt } from "../stmt/Stmt.js"

export async function execute(mod: Mod, stmt: Stmt): Promise<void | string> {
  switch (stmt["@kind"]) {
    case "AssertEqual": {
      for (let i = 0; i < stmt.exps.length - 1; i++) {
        assertEqual(mod, stmt.exps[i], stmt.exps[i + 1])
      }

      return
    }

    case "AssertNotEqual": {
      for (let i = 0; i < stmt.exps.length - 1; i++) {
        assertNotEqual(mod, stmt.exps[i], stmt.exps[i + 1])
      }

      return
    }

    case "Comments": {
      return
    }

    case "Compute": {
      const value = evaluate(mod, Env.init(), stmt.exp)
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

      return
    }

    case "DisplayFreeNames": {
      const freeNames = Exps.freeNames(new Set(), stmt.exp)
      return `(free-names ${Array.from(freeNames).join(" ")})`
    }

    case "Import": {
      const importedMod = await importMod(mod, stmt.path)
      for (const { name, rename } of stmt.entries) {
        const def = modFind(importedMod, name)
        if (def === undefined) {
          throw new Error(
            `I can not import undefined name: ${name}, from path: ${stmt.path}`,
          )
        }

        modDefine(mod, rename || name, def)
      }
    }
  }
}

function assertEqual(mod: Mod, left: Exp, right: Exp): void {
  const leftValue = evaluate(mod, Env.init(), left)
  const rightValue = evaluate(mod, Env.init(), right)
  if (!equivalent(EquivalentCtx.init(), leftValue, rightValue)) {
    throw new AssertionError(
      `((fail assert-equal) ${formatExp(left)} ${formatExp(right)})`,
    )
  }
}

function assertNotEqual(mod: Mod, left: Exp, right: Exp): void {
  const leftValue = evaluate(mod, Env.init(), left)
  const rightValue = evaluate(mod, Env.init(), right)
  if (equivalent(EquivalentCtx.init(), leftValue, rightValue)) {
    throw new AssertionError(
      `((fail assert-not-equal) ${formatExp(left)} ${formatExp(right)})`,
    )
  }
}

function assertAllNamesDefined(mod: Mod, stmt: Define): void {
  const freeNames = Exps.freeNames(
    new Set([stmt.name, ...builtinNames]),
    stmt.exp,
  )
  for (const name of freeNames) {
    if (modFind(mod, name) === undefined) {
      throw new LangError(
        [
          `I find undefined name: ${name}`,
          `  defining: ${stmt.name}`,
          `  body: ${formatExp(stmt.exp)}`,
        ].join("\n"),
      )
    }
  }
}

async function importMod(mod: Mod, path: string): Promise<Mod> {
  const url = modResolve(mod, path)
  if (url.href === mod.url.href) {
    throw new Errors.LangError(`I can not circular import: ${path}`)
  }

  return await mod.loader.load(url)
}
