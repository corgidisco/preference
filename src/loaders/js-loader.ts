
import * as types from "../types"

export class JsLoader implements types.Loader {

  public test(filename: string): boolean {
    return /\.js$/i.test(filename)
  }

  public async load(path: string): Promise<any> {
    return require(path.replace(/\.js$/i, ""))
  }

  public loadSync(path: string): any {
    return require(path.replace(/\.js$/i, ""))
  }
}
