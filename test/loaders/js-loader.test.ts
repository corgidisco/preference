
import {} from "jest"

import * as path from "path"
import {JsLoader} from "../../dist/loaders/js-loader"

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

  const loader = new JsLoader()

  it("load success", async () => {
    expect.assertions(1)
    await expect(loader.load(path.resolve(__dirname, "../stubs/js.js"))).resolves.toEqual(expected)
  })

  it("load fail", async () => {
    expect.assertions(1)
    try {
      await loader.load(path.resolve(__dirname, "../stubs/unknown.js"))
    } catch (e) {
      expect(e.code).toBe("MODULE_NOT_FOUND")
    }
  })

  it("loadSync success", () => {
    expect.assertions(1)
    expect(loader.loadSync(path.resolve(__dirname, "../stubs/js.js"))).toEqual(expected)
  })

  it("loadSync fail", () => {
    expect.assertions(1)
    try {
      loader.loadSync(path.resolve(__dirname, "../stubs/unknown.js"))
    } catch (e) {
      expect(e.code).toBe("MODULE_NOT_FOUND")
    }
  })
})
