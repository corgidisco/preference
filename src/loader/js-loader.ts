
import {Loader} from "../types"

const loader: Loader = {
  test(filename: string): boolean {
    return /\.js$/i.test(filename)
  },
  async load(path: string): Promise<any> {
    return require(path.replace(/\.js$/i, ""))
  },
  loadSync(path: string): any {
    return require(path.replace(/\.js$/i, ""))
  },
}

export default loader
