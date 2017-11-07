
import fs from "fs-extra"
import * as ini from "ini"
import {Loader} from "../types"

const loader: Loader = {
  async load(path: string): Promise<any> {
    const contents = await fs.readFile(path)
    return ini.decode(contents.toString())
  },
  loadSync(path: string): any {
    const contents = fs.readFileSync(path)
    return ini.decode(contents.toString())
  },
}

export default loader
