import { expect, test } from "vitest"
import { Loader } from "../../loader"
import * as Values from "../value"

test("A ModLoader can load Mod from url.", async () => {
  const loader = new Loader()
  loader.fetcher.register("mock", (url) => "(define id (lambda (x) x))")

  const mod = await loader.loadAndExecute(new URL("mock:id"))

  expect(mod.findValue("id")).toBeInstanceOf(Values.FnValue)
})

test("A ModLoader can load markdown code.", async () => {
  const loader = new Loader()
  loader.fetcher.register("mock", (url) =>
    [
      "# Church Numerals",

      "```lambda",
      "(define zero (lambda (base step) base))",
      "(define (add1 prev) (lambda (base step) (step (prev base step))))",
      "(define (iter-Nat n base step) (n base step))",
      "```",
    ].join("\n"),
  )

  const mod = await loader.loadAndExecute(new URL("mock:example.md"))

  expect(mod.findValue("zero")).toBeInstanceOf(Values.FnValue)
  expect(mod.findValue("add1")).toBeInstanceOf(Values.FnValue)
  expect(mod.findValue("iter-Nat")).toBeInstanceOf(Values.FnValue)
})

test("A Mod can run a given block, will undo blocks after it.", async () => {
  const loader = new Loader()
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
    ].join("\n"),
  )

  const mod = await loader.loadAndExecute(new URL("mock:example.md"))

  expect(mod.findValue("zero")).toBeInstanceOf(Values.FnValue)
  expect(mod.findValue("add1")).toBeInstanceOf(Values.FnValue)
  expect(mod.findValue("iter-Nat")).toBeInstanceOf(Values.FnValue)

  expect(mod.findValue("one")).toBeInstanceOf(Values.FnValue)
  expect(mod.findValue("two")).toBeInstanceOf(Values.FnValue)
  expect(mod.findValue("three")).toBeInstanceOf(Values.FnValue)

  expect(mod.findValue("four")).toBeInstanceOf(Values.FnValue)
  expect(mod.findValue("five")).toBeInstanceOf(Values.FnValue)
  expect(mod.findValue("six")).toBeInstanceOf(Values.FnValue)

  const block = mod.blocks.getOrFail(1)
  await block.run(mod, "(define one (add1 zero))")

  expect(mod.findValue("zero")).toBeInstanceOf(Values.FnValue)
  expect(mod.findValue("add1")).toBeInstanceOf(Values.FnValue)
  expect(mod.findValue("iter-Nat")).toBeInstanceOf(Values.FnValue)

  expect(mod.findValue("one")).toBeInstanceOf(Values.FnValue)

  expect(mod.findValue("two")).toBeFalsy()
  expect(mod.findValue("three")).toBeFalsy()
  expect(mod.findValue("four")).toBeFalsy()
  expect(mod.findValue("five")).toBeFalsy()
  expect(mod.findValue("six")).toBeFalsy()
})
