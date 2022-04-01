import { TestCase } from "@xieyuheng/test-case"
import * as Exps from "../lang/exps"
import { Mod, ModLoader } from "../lang/mod"

export default class extends TestCase {
  assertModHasFn(mod: Mod, name: string): void {
    const value = mod.lookup(name)
    this.assert(value instanceof Exps.FnValue)
  }

  assertModHasNotDef(mod: Mod, name: string): void {
    const value = mod.lookup(name)
    this.assert(!value)
  }

  async "A ModLoader can load Mod from url."() {
    const loader = new ModLoader()
    loader.fetcher.register("mock", (url) => {
      const name = url.pathname
      return `(define ${name} (lambda (x) x))`
    })

    const mod = await loader.loadAndExecute(new URL("mock:id"))

    this.assertModHasFn(mod, "id")
  }

  async "A ModLoader can load markdown code."() {
    const loader = new ModLoader()
    loader.fetcher.register("mock", (url) => {
      return [
        "# Church Numerals",

        "```lambda",
        "(define zero (lambda (base step) base))",
        "(define (add1 prev) (lambda (base step) (step (prev base step))))",
        "(define (iter-Nat n base step) (n base step))",
        "```",
      ].join("\n")
    })

    const mod = await loader.loadAndExecute(new URL("mock:example.md"))

    this.assertModHasFn(mod, "zero")
    this.assertModHasFn(mod, "add1")
    this.assertModHasFn(mod, "iter-Nat")
  }

  async "A Mod can undo its block."() {
    const loader = new ModLoader()
    loader.fetcher.register("mock", (url) => {
      return [
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
    })

    const mod = await loader.loadAndExecute(new URL("mock:example.md"))

    this.assertModHasFn(mod, "zero")
    this.assertModHasFn(mod, "add1")
    this.assertModHasFn(mod, "iter-Nat")

    this.assertModHasFn(mod, "one")
    this.assertModHasFn(mod, "two")
    this.assertModHasFn(mod, "three")

    this.assertModHasFn(mod, "four")
    this.assertModHasFn(mod, "five")
    this.assertModHasFn(mod, "six")

    const block = mod.blocks.getOrFail(1)
    await block.undo(mod)

    this.assertModHasFn(mod, "zero")
    this.assertModHasFn(mod, "add1")
    this.assertModHasFn(mod, "iter-Nat")

    this.assertModHasNotDef(mod, "one")
    this.assertModHasNotDef(mod, "two")
    this.assertModHasNotDef(mod, "three")

    this.assertModHasNotDef(mod, "four")
    this.assertModHasNotDef(mod, "five")
    this.assertModHasNotDef(mod, "six")
  }
}
