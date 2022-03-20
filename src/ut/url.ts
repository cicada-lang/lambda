import axios from "axios"
import Path from "path"

export interface UrlLoader {
  (url: URL): Promise<string>
}

async function loadHttp(url: URL): Promise<string> {
  const { data } = await axios.get(url.href)
  return data
}

export const builtinUrlLoaders = {
  "http:": loadHttp,
  "https:": loadHttp,
}

export function createUrl(path: string): URL {
  if (path.startsWith("https://") || path.startsWith("http://")) {
    return new URL(path)
  }

  if (path.startsWith("file:")) {
    return new URL(path)
  }

  return new URL(`file:${Path.resolve(path)}`)
}
