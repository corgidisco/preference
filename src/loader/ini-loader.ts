
import * as fs from "fs"
import {Loader} from "../types"

const loader: Loader = {
  test(filename: string): boolean {
    return /\.(ini|cfg|conf)$/i.test(filename)
  },
  async load(path: string): Promise<any> {
    const contents = await new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          reject(err)
          return
        }
        resolve(data)
      })
    })
    return require("ini").decode(contents.toString())
  },
  loadSync(path: string): any {
    const contents = fs.readFileSync(path)
    return require("ini").decode(contents.toString())
  },
}

export default loader
