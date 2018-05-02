
import * as fs from "../util/fs"
import {Loader} from "../types"

const loader: Loader = {
  test(filename: string): boolean {
    return /\.json$/i.test(filename)
  },
  async load(path: string): Promise<any> {
    const contents = await fs.readFile(path)
    return JSON.parse(contents.toString())
  },
  loadSync(path: string): any {
    const contents = fs.readFileSync(path)
    return JSON.parse(contents.toString())
  },
}

export default loader
