
import * as fs from "fs-extra"
import {Loader} from "../types"

const loader: Loader = {
  test(filename: string): boolean {
    return /\.env$/i.test(filename)
  },
  async load(path: string): Promise<any> {
    const contents = await fs.readFile(path)
    return require("dotenv").parse(contents.toString())
  },
  loadSync(path: string): any {
    const contents = fs.readFileSync(path)
    return require("dotenv").parse(contents.toString())
  },
}

export default loader
