
import * as fs from "fs-extra"
import {resolve, extname, basename} from "path"
import * as types from "./types"
import yamlLoader from "./loader/yaml-loader"
import jsonLoader from "./loader/json-loader"
import iniLoader from "./loader/ini-loader"
import tomlLoader from "./loader/toml-loader"
import dotenvLoader from "./loader/dotenv-loader"

export default class Preference {

  private options: types.PreferenceOptions

  constructor(options?: types.PreferenceOptions) {
    this.options = options || {
      dotenvLoader,
      yamlLoader,
      jsonLoader,
      tomlLoader,
      iniLoader,
    }
  }

  public async load(path: string): Promise<any> {
    const result: any = {}
    for (const file of (await fs.readdir(path))) {
      try {
        const filePath = resolve(path, file)
        const fileObj = await (fs.lstat(filePath))
        if (fileObj.isFile()) {
          if (file === ".env" && this.options.dotenvLoader) {
            Object.assign(result, await this.options.dotenvLoader.load(filePath))
            continue
          }
          const fileExt = extname(filePath)
          switch (fileExt.toLowerCase()) {
            case ".yaml":
            case ".yml":
              if (this.options.yamlLoader) {
                result[basename(filePath, fileExt)] = await this.options.yamlLoader.load(filePath)
              }
              break
            case ".json":
              if (this.options.jsonLoader) {
                result[basename(filePath, fileExt)] = await this.options.jsonLoader.load(filePath)
              }
              break
            case ".ini":
            case ".cfg":
            case ".conf":
              if (this.options.iniLoader) {
                result[basename(filePath, fileExt)] = await this.options.iniLoader.load(filePath)
              }
              break
            case ".toml":
              if (this.options.tomlLoader) {
                result[basename(filePath, fileExt)] = await this.options.tomlLoader.load(filePath)
              }
              break
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
        const filePath = resolve(path, file)
        const fileObj = fs.lstatSync(filePath)
        if (fileObj.isFile()) {
          if (file === ".env" && this.options.dotenvLoader) {
            Object.assign(result, this.options.dotenvLoader.loadSync(filePath))
            continue
          }
          const fileExt = extname(filePath)
          switch (fileExt.toLowerCase()) {
            case ".yaml":
            case ".yml":
              if (this.options.yamlLoader) {
                result[basename(filePath, fileExt)] = this.options.yamlLoader.loadSync(filePath)
              }
              break
            case ".json":
              if (this.options.jsonLoader) {
                result[basename(filePath, fileExt)] = this.options.jsonLoader.loadSync(filePath)
              }
              break
            case ".ini":
            case ".cfg":
            case ".conf":
              if (this.options.iniLoader) {
                result[basename(filePath, fileExt)] = this.options.iniLoader.loadSync(filePath)
              }
              break
            case ".toml":
              if (this.options.tomlLoader) {
                result[basename(filePath, fileExt)] = this.options.tomlLoader.loadSync(filePath)
              }
              break
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
