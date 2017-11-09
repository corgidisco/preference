
import fs from "fs-extra"
import * as dotenv from "dotenv"
import {Loader} from "../types"

const loader: Loader = {
  async load(path: string): Promise<any> {
    const contents = await fs.readFile(path)
    return dotenv.parse(contents.toString())
  },
  loadSync(path: string): any {
    const contents = fs.readFileSync(path)
    return dotenv.parse(contents.toString())
  },
}

export default loader
