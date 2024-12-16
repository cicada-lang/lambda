import { load } from "./load.ts"
import { runMod } from "./runMod.ts"

export async function run(url: URL): Promise<void> {
  const mod = await load(url, new Map())
  runMod(mod)
}
