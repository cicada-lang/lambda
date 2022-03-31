import { TestCase } from "@xieyuheng/test-case"
import { Fetcher } from "../fetcher"

export default class extends TestCase {
  fetcher = new Fetcher()

  "can handle http and https by default"() {
    this.assertEquals(1 + 1, 2)
    this.assertNotEquals(1 + 1, 3)
  }

  "can be extended to handle other url protocol"() {
    this.assertEquals(3 * 3, 9)
  }
}
