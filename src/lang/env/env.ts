import { Value } from "../value"

export class Env {
  values: Map<string, Value>

  constructor(values?: Map<string, Value>) {
    this.values = values || new Map()
  }

  get names(): Array<string> {
    return Array.from(this.values.keys())
  }

  lookup(name: string): undefined | Value {
    return this.values.get(name)
  }

  extend(name: string, value: Value): Env {
    return new Env(new Map([...this.values, [name, value]]))
  }

  is(freeNames: Set<string>, that: Env): boolean {
    for (const freeName of freeNames) {
      const thisValue = this.lookup(freeName)
      const thatValue = that.lookup(freeName)

      if (thisValue === undefined && thatValue === undefined) {
        continue
      }

      if (
        thisValue !== undefined &&
        thatValue !== undefined &&
        thisValue.is(thatValue)
      ) {
        continue
      }

      return false
    }

    return true
  }
}
