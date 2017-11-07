
import fs from "fs-extra"
import yaml from "js-yaml"
import {Loader} from "../types"

const loader: Loader = {
  async load(path: string): Promise<any> {
    const contents = await fs.readFile(path)
    return yaml.load(contents.toString())
  },
  loadSync(path: string): any {
    const contents = fs.readFileSync(path)
    return yaml.load(contents.toString())
  },
}

export default loader
