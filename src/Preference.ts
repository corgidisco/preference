
import * as path from "path"
import * as fs from "./util/fs"
import * as types from "./types"
import * as loaders from "./loaders"

export class Preference {

  public static shared = new Preference({})

  private options: types.PreferenceOptions

  constructor(options: types.PreferenceOptions) {
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
    for (const file of (await fs.readdir(dirname))) {
      try {
        const filePath = path.resolve(dirname, file)
        const fileObj = await fs.lstat(filePath)
        if (fileObj.isFile()) {
          const fileExt = path.extname(filePath)
          for (const loader of this.options.loaders || []) {
            if (loader.test(file)) {
              const base = path.basename(filePath, fileExt)
              if (base === file) { // name is null
                Object.assign(result, await loader.load(filePath))
              } else {
                result[base] = await loader.load(filePath)
              }
              break
            }
          }
        } else {
          result[path.basename(filePath)] = await this.load(filePath)
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

    for (const file of fs.readdirSync(dirname)) {
      try {
        const filePath = path.resolve(dirname, file)
        const fileObj = fs.lstatSync(filePath)
        if (fileObj.isFile()) {
          const fileExt = path.extname(filePath)
          for (const loader of this.options.loaders || []) {
            if (loader.test(file)) {
              const base = path.basename(filePath, fileExt)
              if (base === file) { // name is null
                Object.assign(result, loader.loadSync(filePath))
              } else {
                result[base] = loader.loadSync(filePath)
              }
              break
            }
          }
        } else {
          result[path.basename(filePath)] = this.loadSync(filePath)
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
