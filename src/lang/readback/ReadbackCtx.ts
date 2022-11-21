export class ReadbackCtx {
  usedNames: Set<string>

  constructor(options: { usedNames: Set<string> }) {
    this.usedNames = options.usedNames
  }

  static init(): ReadbackCtx {
    return new ReadbackCtx({
      usedNames: new Set(),
    })
  }

  useName(name: string): ReadbackCtx {
    return new ReadbackCtx({
      ...this,
      usedNames: new Set([...this.usedNames, name]),
    })
  }
}
