import assert from "node:assert"
import { test } from "node:test"
import { freshen } from "./freshen.js"

test("freshen create new string not in set", () => {
  assert.deepStrictEqual(freshen(["x"], "x"), "x₁")
  assert.deepStrictEqual(freshen(["x", "x₁"], "x"), "x₂")
  assert.deepStrictEqual(freshen(["x", "x₁", "x₂"], "x"), "x₃")
})
