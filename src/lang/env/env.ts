import { Value } from "../value"

export class Env {
  values: Map<string, Value>

  constructor(options: { values: Map<string, Value> }) {
    this.values = options.values
  }

  static init(): Env {
    return new Env({
      values: new Map(),
    })
  }

  get names(): Array<string> {
    return Array.from(this.values.keys())
  }

  lookup(name: string): undefined | Value {
    return this.values.get(name)
  }

  extend(name: string, value: Value): Env {
    return new Env({
      ...this,
      values: new Map([...this.values, [name, value]]),
    })
  }
}
