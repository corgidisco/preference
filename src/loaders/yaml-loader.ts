
import * as template from "../template"
import * as types from "../types"
import * as fs from "../util/fs"

function parse(contents: Buffer): string {
  return require("js-yaml").load(template.createWithCache(contents.toString())({}))
}

export class YamlLoader implements types.Loader {

  public test(filename: string): boolean {
    return /\.ya?ml$/i.test(filename)
  }

  public async load(path: string): Promise<any> {
    return parse(await fs.readFile(path))
  }

  public loadSync(path: string): any {
    return parse(fs.readFileSync(path))
  }
}
