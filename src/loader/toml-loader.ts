
import fs from "fs-extra"
import toml from "toml"
import {Loader} from "../types"

const loader: Loader = {
  async load(path: string): Promise<any> {
    const contents = await fs.readFile(path)
    return toml.parse(contents.toString())
  },
  loadSync(path: string): any {
    const contents = fs.readFileSync(path)
    return toml.parse(contents.toString())
  },
}

export default loader
