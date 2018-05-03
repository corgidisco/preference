
import * as fs from "../util/fs"
import * as template from "../template"
import {Loader} from "../types"

function parse(contents: Buffer): string {
  return require("toml").parse(template.createWithCache(contents.toString())({}))
}

const loader: Loader = {
  test(filename: string): boolean {
    return /\.toml$/i.test(filename)
  },
  async load(path: string): Promise<any> {
    return parse(await fs.readFile(path))
  },
  loadSync(path: string): any {
    return parse(fs.readFileSync(path))
  },
}

export default loader
