
import * as fs from "fs"
import {resolve as pathResolve, extname, basename} from "path"
import * as types from "./types"
import yamlLoader from "./loader/yaml-loader"
import jsonLoader from "./loader/json-loader"
import iniLoader from "./loader/ini-loader"
import tomlLoader from "./loader/toml-loader"

function lstat(path: string): Promise<fs.Stats> {
  return new Promise((resolve, reject) => {
    fs.lstat(path, (err, files) => {
      if (err) {
        reject(err)
        return
      }
      resolve(files)
    })
  })
}

function readdir(path: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err)
        return
      }
      resolve(files)
    })
  })
}

export default class Preference {

  private options: types.PreferenceOptions

  constructor(options?: types.PreferenceOptions) {
    this.options = Object.assign({
      loaders: [
        yamlLoader,
        jsonLoader,
        tomlLoader,
        iniLoader,
      ],
    }, options)
  }

  public async load(path: string): Promise<any> {
    const result: any = {}
    for (const file of (await readdir(path))) {
      try {
        const filePath = pathResolve(path, file)
        const fileObj = await lstat(filePath)
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
