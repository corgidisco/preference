
import {resolve as pathResolve, extname, basename} from "path"
import * as fs from "./util/fs"
import * as types from "./types"
import yamlLoader from "./loader/yaml-loader"
import jsonLoader from "./loader/json-loader"
import iniLoader from "./loader/ini-loader"
import tomlLoader from "./loader/toml-loader"
import jsLoader from "./loader/js-loader"

export default class Preference {

  private options: types.PreferenceOptions

  constructor(options?: types.PreferenceOptions) {
    this.options = Object.assign({
      loaders: [
        yamlLoader,
        jsonLoader,
        tomlLoader,
        iniLoader,
        jsLoader,
      ],
    }, options)
  }

  public async load(path: string): Promise<any> {
    const result: any = {}
    for (const file of (await fs.readdir(path))) {
      try {
        const filePath = pathResolve(path, file)
        const fileObj = await fs.lstat(filePath)
        if (fileObj.isFile()) {
          const fileExt = extname(filePath)
          for (const loader of this.options.loaders || []) {
            if (loader.test(file)) {
              const base = basename(filePath, fileExt)
              if (base === file) { // name is null
                Object.assign(result, await loader.load(filePath))
              } else {
                result[base] = await loader.load(filePath)
              }
              break
            }
          }
        } else {
          result[basename(filePath)] = await this.load(filePath)
        }
      } catch (e) {
        if (this.options.noIgnoreErrors) {
          throw e
        }
      }
    }

    return result
  }

  public loadSync(path: string): any {
    const result: any = {}

    for (const file of fs.readdirSync(path)) {
      try {
        const filePath = pathResolve(path, file)
        const fileObj = fs.lstatSync(filePath)
        if (fileObj.isFile()) {
          const fileExt = extname(filePath)
          for (const loader of this.options.loaders || []) {
            if (loader.test(file)) {
              const base = basename(filePath, fileExt)
              if (base === file) { // name is null
                Object.assign(result, loader.loadSync(filePath))
              } else {
                result[base] = loader.loadSync(filePath)
              }
              break
            }
          }
        } else {
          result[basename(filePath)] = this.loadSync(filePath)
        }
      } catch (e) {
        if (this.options.noIgnoreErrors) {
          throw e
        }
      }
    }
    return result
  }
}
