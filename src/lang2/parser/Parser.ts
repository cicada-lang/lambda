import type { Token } from "./index.js"

export type Parser<A> = (tokens: Array<Token>) => A
