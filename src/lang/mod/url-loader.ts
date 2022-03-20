import axios from "axios"

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
