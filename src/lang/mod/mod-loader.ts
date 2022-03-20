import { Mod } from "../mod"

export interface ModLoader {
  load(url: URL): Promise<Mod>
}
