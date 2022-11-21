export class EquivalentCtx {
  usedNames: Set<string>

  constructor(options: { usedNames: Set<string> }) {
    this.usedNames = options.usedNames
  }

  static init(): EquivalentCtx {
    return new EquivalentCtx({
      usedNames: new Set(),
    })
  }

  useName(name: string): EquivalentCtx {
    return new EquivalentCtx({
      ...this,
      usedNames: new Set([...this.usedNames, name]),
    })
  }
}
