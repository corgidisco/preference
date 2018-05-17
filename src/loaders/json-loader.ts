
import * as fs from "../util/fs"
import * as template from "../template"
import * as types from "../types"

function parse(contents: Buffer): string {
  return JSON.parse(template.createWithCache(contents.toString())({}))
}

export class JsonLoader implements types.Loader {

  public test(filename: string): boolean {
    return /\.json$/i.test(filename)
  }

  public async load(path: string): Promise<any> {
    return parse(await fs.readFile(path))
  }

  public loadSync(path: string): any {
    return parse(fs.readFileSync(path))
  }
}
