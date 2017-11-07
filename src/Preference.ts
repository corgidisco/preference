
import fs from "fs-extra"
import {resolve, extname, basename} from "path"
import * as types from "./types"
import yamlLoader from "./loader/yaml-loader"
import jsonLoader from "./loader/json-loader"

export default class Preference {

  private options: types.PreferenceOptions

  constructor(options?: types.PreferenceOptions) {
    this.options = options || {
      yamlLoader,
      jsonLoader,
    }
  }

  public async load(path: string): Promise<any> {
    const result = {}
    for (const file of (await fs.readdir(path))) {
      const filePath = resolve(path, file)
      const fileObj = await (fs.lstat(filePath))
      if (fileObj.isFile()) {
        switch (extname(filePath)) {
          case ".yaml":
            if (this.options.yamlLoader) {
              result[basename(filePath, ".yaml")] = await this.options.yamlLoader.load(filePath)
            }
            break
          case ".json":
            if (this.options.jsonLoader) {
              result[basename(filePath, ".json")] = await this.options.jsonLoader.load(filePath)
            }
            break
        }
      } else {
        result[basename(filePath)] = await this.load(filePath)
      }
    }

    return result
  }

  public loadSync(path: string): any {
    const result = {}
    for (const file of fs.readdirSync(path)) {
      const filePath = resolve(path, file)
      const fileObj = fs.lstatSync(filePath)
      if (fileObj.isFile()) {
        switch (extname(filePath)) {
          case ".yaml":
            if (this.options.yamlLoader) {
              result[basename(filePath, ".yaml")] = this.options.yamlLoader.loadSync(filePath)
            }
            break
          case ".json":
            if (this.options.jsonLoader) {
              result[basename(filePath, ".json")] = this.options.jsonLoader.loadSync(filePath)
            }
            break
        }
      } else {
        result[basename(filePath)] = this.loadSync(filePath)
      }
    }
    return result
  }
}
