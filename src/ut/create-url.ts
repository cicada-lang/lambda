import Path from "path"

export function createUrl(path: string): URL {
  if (path.startsWith("https://") || path.startsWith("http://")) {
    return new URL(path)
  }

  if (path.startsWith("file:")) {
    return new URL(path)
  }

  return new URL(`file:${Path.resolve(path)}`)
}
