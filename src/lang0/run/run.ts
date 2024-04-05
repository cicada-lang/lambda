import { load } from "./load.js"
import { runMod } from "./runMod.js"

export async function run(url: URL): Promise<void> {
  const mod = await load(url, new Map())
  runMod(mod)
}
