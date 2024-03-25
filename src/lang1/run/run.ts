import { executeMod } from "./executeMod.js"
import { load } from "./load.js"

export async function run(url: URL): Promise<void> {
  const mod = await load(url, new Map())
  executeMod(mod)
}
