import { TestCase } from "@xieyuheng/test-case"
import { Fetcher } from "../fetcher"

export default class extends TestCase {
  // can handle http by default

  // can be extended to handle other url protocol

  ["test add"]() {
    this.assertEquals(1 + 1, 2)
    this.assertNotEquals(1 + 1, 3)
  }

  ["test mul"]() {
    this.assertEquals(3 * 3, 9)
  }
}
