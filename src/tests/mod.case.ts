import { TestCase } from "@xieyuheng/test-case"
import { ModLoader } from "../lang/mod"
import * as Exps from "../lang/exps"

export default class extends TestCase {
  async "A ModLoader can load Mod from url"() {
    const loader = new ModLoader()
    loader.fetcher.register("mock", (url) => {
      const name = url.pathname
      return `(define ${name} (lambda (x) x))`
    })

    const mod = await loader.load(new URL("mock:id"))
    const value = mod.lookup("id")

    this.assert(value instanceof Exps.FnValue)
    this.assertEquals((value as Exps.FnValue).name, "x")
  }
}
