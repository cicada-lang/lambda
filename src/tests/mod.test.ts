import { expect, test } from "vitest"
import * as Exps from "../lang/exps"
import { Mod, ModLoader } from "../lang/mod"

function assertModHasFn(mod: Mod, name: string): void {
  const value = mod.findValue(name)
  expect(value instanceof Exps.FnValue).toBe(true)
}

function assertModHasNotDef(mod: Mod, name: string): void {
  const value = mod.findValue(name)
  expect(!value).toBeTruthy()
}

test("A ModLoader can load Mod from url.", async () => {
  const loader = new ModLoader()
  loader.fetcher.register("mock", (url) => "(define id (lambda (x) x))")

  const mod = await loader.loadAndExecute(new URL("mock:id"))

  assertModHasFn(mod, "id")
})

test("A ModLoader can load markdown code.", async () => {
  const loader = new ModLoader()
  loader.fetcher.register("mock", (url) =>
    [
      "# Church Numerals",

      "```lambda",
      "(define zero (lambda (base step) base))",
      "(define (add1 prev) (lambda (base step) (step (prev base step))))",
      "(define (iter-Nat n base step) (n base step))",
      "```",
    ].join("\n")
  )

  const mod = await loader.loadAndExecute(new URL("mock:example.md"))

  assertModHasFn(mod, "zero")
  assertModHasFn(mod, "add1")
  assertModHasFn(mod, "iter-Nat")
})

test("A Mod can run a given block, will undo blocks after it.", async () => {
  const loader = new ModLoader()
  loader.fetcher.register("mock", (url) =>
    [
      "# Church Numerals",

      "```lambda",
      "(define zero (lambda (base step) base))",
      "(define (add1 prev) (lambda (base step) (step (prev base step))))",
      "(define (iter-Nat n base step) (n base step))",
      "```",

      "```lambda",
      "(define one (add1 zero))",
      "(define two (add1 one))",
      "(define three (add1 two))",
      "```",

      "```lambda",
      "(define four (add1 three))",
      "(define five (add1 four))",
      "(define six (add1 five))",
      "```",
    ].join("\n")
  )

  const mod = await loader.loadAndExecute(new URL("mock:example.md"))

  assertModHasFn(mod, "zero")
  assertModHasFn(mod, "add1")
  assertModHasFn(mod, "iter-Nat")

  assertModHasFn(mod, "one")
  assertModHasFn(mod, "two")
  assertModHasFn(mod, "three")

  assertModHasFn(mod, "four")
  assertModHasFn(mod, "five")
  assertModHasFn(mod, "six")

  const block = mod.blocks.getOrFail(1)
  await block.run(mod, "(define one (add1 zero))")

  assertModHasFn(mod, "zero")
  assertModHasFn(mod, "add1")
  assertModHasFn(mod, "iter-Nat")

  assertModHasFn(mod, "one")
  assertModHasNotDef(mod, "two")
  assertModHasNotDef(mod, "three")

  assertModHasNotDef(mod, "four")
  assertModHasNotDef(mod, "five")
  assertModHasNotDef(mod, "six")
})
