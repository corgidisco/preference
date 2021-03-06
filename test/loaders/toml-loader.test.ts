
import "jest"

import * as path from "path"

import { TomlLoader } from "../../dist/loaders/toml-loader"

function resolve(...dir: string[]): string {
  return path.resolve(__dirname, "..", ...dir)
}

const expected = {
  array: [10, 20, 30],
  bar: 1010,
  baz: 10.1,
  foo: "foo string",
  object: {
    object1: "object 1",
    object2: "object 1",
  },
}

describe("toml-loader", () => {

  const loader = new TomlLoader()

  it("load success", async () => {
    expect.assertions(1)
    await expect(loader.load(resolve("stubs/toml.toml"))).resolves.toEqual(expected)
  })

  it("load fail", async () => {
    expect.assertions(2)
    try {
      await loader.load(resolve("stubs/unknown.toml"))
    } catch (e) {
      expect(e.code).toBe("ENOENT")
      expect(e.errno).toBe(-2)
    }
  })

  it("loadSync success", () => {
    expect.assertions(1)
    expect(loader.loadSync(resolve("stubs/toml.toml"))).toEqual(expected)
  })

  it("loadSync fail", () => {
    expect.assertions(2)
    try {
      loader.loadSync(resolve("stubs/unknown.toml"))
    } catch (e) {
      expect(e.code).toBe("ENOENT")
      expect(e.errno).toBe(-2)
    }
  })
})
