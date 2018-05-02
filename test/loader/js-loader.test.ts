
import {} from "jest"

import loader from "../../dist/loader/js-loader"
import * as path from "path"

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

describe("js-loader", () => {

  it("load success", async () => {
    expect.assertions(1)
    await expect(loader.load(resolve("stubs/js.js"))).resolves.toEqual(expected)
  })

  it("load fail", async () => {
    expect.assertions(1)
    try {
      await loader.load(resolve("stubs/unknown.js"))
    } catch (e) {
      expect(e.code).toBe("MODULE_NOT_FOUND")
    }
  })

  it("loadSync success", () => {
    expect.assertions(1)
    expect(loader.loadSync(resolve("stubs/js.js"))).toEqual(expected)
  })

  it("loadSync fail", () => {
    expect.assertions(1)
    try {
      loader.loadSync(resolve("stubs/unknown.js"))
    } catch (e) {
      expect(e.code).toBe("MODULE_NOT_FOUND")
    }
  })
})
