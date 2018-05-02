
import * as fs from "../util/fs"
import {Loader} from "../types"

const loader: Loader = {
  test(filename: string): boolean {
    return /\.(ini|cfg|conf)$/i.test(filename)
  },
  async load(path: string): Promise<any> {
    const contents = await fs.readFile(path)
    return require("ini").decode(contents.toString())
  },
  loadSync(path: string): any {
    const contents = fs.readFileSync(path)
    return require("ini").decode(contents.toString())
  },
}

export default loader
