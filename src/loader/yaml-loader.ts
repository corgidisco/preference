
import * as fs from "fs-extra"
import {Loader} from "../types"

const loader: Loader = {
  async load(path: string): Promise<any> {
    const contents = await fs.readFile(path)
    return require("js-yaml").load(contents.toString())
  },
  loadSync(path: string): any {
    const contents = fs.readFileSync(path)
    return require("js-yaml").load(contents.toString())
  },
}

export default loader
