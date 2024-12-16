import { type Mod } from "./index.ts"

export function modResolve(mod: Mod, href: string): URL {
  return new URL(href, mod.url)
}
