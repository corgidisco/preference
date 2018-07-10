
import * as path from "path"
import * as loaders from "../loaders"
import * as types from "../types"
import * as fs from "../util/fs"

function merge(obj1: any, obj2: any): any {
  for (const key of Object.keys(obj2)) {
    if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      obj1[key] = merge(obj1[key], obj2[key])
    } else {
      obj1[key] = obj2[key]
    }
  }
  return obj1
}

export interface PreferenceConfig {
  noIgnoreErrors?: boolean // default false
  loaders?: types.Loader[]
}

export class Preference {

  private options: PreferenceConfig

  constructor(options: PreferenceConfig) {
    this.options = Object.assign({
      loaders: [
        new loaders.YamlLoader(),
        new loaders.JsonLoader(),
        new loaders.TomlLoader(),
        new loaders.IniLoader(),
        new loaders.JsLoader(),
      ],
    }, options)
  }

  public async load<P>(dirname: string): Promise<P> {
    const result: any = {}
    const filenames = await fs.readdir(dirname)
    const files = (await Promise.all(filenames.map(async (fileName) => {
      const filePath = path.resolve(dirname, fileName)
      const fileObj = await fs.lstat(filePath)
      return {
        name: fileName,
        path: filePath,
        isFile: fileObj.isFile(),
      }
    }))).sort((file1, file2) => {
      if (file1.isFile === file2.isFile) {
        return 0
      }
      return file1.isFile ? 1 : -1
    })

    for (const file of files) {
      try {
        if (file.isFile) {
          const fileExt = path.extname(file.path)
          for (const loader of this.options.loaders || []) {
            if (loader.test(file.name)) {
              const base = path.basename(file.path, fileExt)
              if (base === file.name) { // name is null
                merge(result, await loader.load(file.path))
              } else {
                result[base] = merge(result[base] || {}, await loader.load(file.path))
              }
              break
            }
          }
        } else {
          const base = path.basename(file.path)
          result[base] = merge(result[base] || {}, await this.load(file.path))
        }
      } catch (e) {
        if (this.options.noIgnoreErrors) {
          throw e
        }
      }
    }

    return result as P
  }

  public loadSync<P>(dirname: string): P {
    const result: any = {}
    const files = fs.readdirSync(dirname).map(fileName => {
      const filePath = path.resolve(dirname, fileName)
      const fileObj = fs.lstatSync(filePath)
      return {
        name: fileName,
        path: filePath,
        isFile: fileObj.isFile(),
      }
    }).sort((file1, file2) => {
      if (file1.isFile === file2.isFile) {
        return 0
      }
      return file1.isFile ? 1 : -1
    })

    for (const file of files) {
      try {
        if (file.isFile) {
          const fileExt = path.extname(file.path)
          for (const loader of this.options.loaders || []) {
            if (loader.test(file.name)) {
              const base = path.basename(file.path, fileExt)
              if (base === file.name) { // name is null
                merge(result, loader.loadSync(file.path))
              } else {
                result[base] = merge(result[base] || {}, loader.loadSync(file.path))
              }
              break
            }
          }
        } else {
          const base = path.basename(file.path)
          result[base] = merge(result[base] || {}, this.loadSync(file.path))
        }
      } catch (e) {
        if (this.options.noIgnoreErrors) {
          throw e
        }
      }
    }
    return result as P
  }
}
