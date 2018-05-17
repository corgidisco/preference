
import {resolve as pathResolve, extname, basename} from "path"
import * as events from "events"
import * as fs from "./util/fs"
import * as types from "./types"
import * as loaders from "./loaders"

export class Preference extends events.EventEmitter {

  public static shared = new Preference({})

  private options: types.PreferenceOptions

  constructor(options: types.PreferenceOptions) {
    super()
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

  public async load<P>(path: string): Promise<P> {
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

    return result as P
  }

  public loadSync<P>(path: string): P {
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
    return result as P
  }
}
