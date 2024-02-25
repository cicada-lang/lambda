export let globalNameCounter = 1

export function freshen(name: string): string {
  return `${name}${globalNameCounter++}`
}
