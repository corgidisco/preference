
import fs from "fs-extra"
import yaml from "js-yaml"
import * as types from "../types"

export default class YamlLoader implements types.Loader {
  public async load(path: string): Promise<any> {
    const contents = await fs.readFile(path)
    return yaml.load(contents.toString())
  }

  public loadSync(path: string): any {
    const contents = fs.readFileSync(path)
    return yaml.load(contents.toString())
  }
}
