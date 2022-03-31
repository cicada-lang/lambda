import { TestCase } from "@xieyuheng/test-case"
import { Mod } from "../lang/mod"

export default class extends TestCase {
  ["test add"]() {
    this.assertEquals(1 + 1, 2)
    this.assertNotEquals(1 + 1, 3)
  }

  ["test mul"]() {
    this.assertEquals(3 * 3, 9)
  }
}
