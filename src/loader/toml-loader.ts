
import * as fs from "../util/fs"
import {Loader} from "../types"

const loader: Loader = {
  test(filename: string): boolean {
    return /\.toml$/i.test(filename)
  },
  async load(path: string): Promise<any> {
    const contents = await fs.readFile(path)
    return require("toml").parse(contents.toString())
  },
  loadSync(path: string): any {
    const contents = fs.readFileSync(path)
    return require("toml").parse(contents.toString())
  },
}

export default loader
