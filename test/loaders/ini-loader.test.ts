
import "jest"

import * as path from "path"

import { IniLoader } from "../../dist/loaders/ini-loader"

function resolve(...dir: string[]): string {
  return path.resolve(__dirname, "..", ...dir)
}

const expected = {
  array: ["10", "20", "30"],
  bar: "1010",
  baz: "10.1",
  foo: "foo string",
  object: {
    object1: "object 1",
    object2: "object 1",
  },
}

describe("ini-loader", () => {

  const loader = new IniLoader()

  it("load success", async () => {
    expect.assertions(1)
    await expect(loader.load(resolve("stubs/ini.ini"))).resolves.toEqual(expected)
  })

  it("load fail", async () => {
    expect.assertions(2)
    try {
      await loader.load(resolve("stubs/unknown.ini"))
    } catch (e) {
      expect(e.code).toBe("ENOENT")
      expect(e.errno).toBe(-2)
    }
  })

  it("loadSync success", () => {
    expect.assertions(1)
    expect(loader.loadSync(resolve("stubs/ini.ini"))).toEqual(expected)
  })

  it("loadSync fail", () => {
    expect.assertions(2)
    try {
      loader.loadSync(resolve("stubs/unknown.ini"))
    } catch (e) {
      expect(e.code).toBe("ENOENT")
      expect(e.errno).toBe(-2)
    }
  })
})
