import { TestCase } from "@xieyuheng/test-case"
import { Fetcher } from "../fetcher"

export default class extends TestCase {
  async "can handle http and https by default"() {
    const fetcher = new Fetcher()
    await fetcher.fetch(new URL("http://example.com"))
    await fetcher.fetch(new URL("https://example.com"))
  }

  "can be extended to handle other url protocol"() {
    this.assertEquals(3 * 3, 9)
  }
}
