import { BlockResource } from "../block"

export abstract class BlockParser {
  abstract parse(text: string): BlockResource
}
