
import "jest"

import * as path from "path"

import { JsonLoader } from "../../dist/loaders/json-loader"

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

describe("json-loader", () => {

  const loader = new JsonLoader()

  it("load success", async () => {
    expect.assertions(1)
    await expect(loader.load(resolve("stubs/json.json"))).resolves.toEqual(expected)
  })

  it("load fail", async () => {
    expect.assertions(2)
    try {
      await loader.load(resolve("stubs/unknown.json"))
    } catch (e) {
      expect(e.code).toBe("ENOENT")
      expect(e.errno).toBe(-2)
    }
  })

  it("loadSync success", () => {
    expect.assertions(1)
    expect(loader.loadSync(resolve("stubs/json.json"))).toEqual(expected)
  })

  it("loadSync fail", () => {
    expect.assertions(2)
    try {
      loader.loadSync(resolve("stubs/unknown.json"))
    } catch (e) {
      expect(e.code).toBe("ENOENT")
      expect(e.errno).toBe(-2)
    }
  })
})
