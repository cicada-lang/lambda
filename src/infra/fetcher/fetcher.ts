import axios from "axios"

export class Fetcher {
  async fetch(url: URL): Promise<string> {
    const { data } = await axios.get(url.href)
    return data
  }
}
