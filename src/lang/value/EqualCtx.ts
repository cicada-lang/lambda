export class EqualCtx {
  usedNames: Set<string>

  constructor(options: { usedNames: Set<string> }) {
    this.usedNames = options.usedNames
  }

  static init(): EqualCtx {
    return new EqualCtx({
      usedNames: new Set(),
    })
  }

  useName(name: string): EqualCtx {
    return new EqualCtx({
      ...this,
      usedNames: new Set([...this.usedNames, name]),
    })
  }
}
