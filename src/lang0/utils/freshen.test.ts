import assert from "node:assert"
import { test } from "node:test"
import { freshen } from "./freshen.js"

test("freshen create new string not in set", () => {
  assert.deepStrictEqual(freshen(["x"], "x"), "x1")
  assert.deepStrictEqual(freshen(["x", "x1"], "x"), "x2")
  assert.deepStrictEqual(freshen(["x", "x1", "x2"], "x"), "x3")
})
