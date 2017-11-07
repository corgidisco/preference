
import {} from "jest"

import Preference from "../src/Preference"
import path from "path"

function resolve(...dir: string[]): string {
  return path.resolve(__dirname, "..", ...dir)
}

describe("Preference", () => {

  const pref = new Preference()

  it("load success", async () => {
    expect.assertions(1)
    await expect(pref.load(resolve("test/stubs"))).resolves.toEqual({
      database: {
        mysql: {
          host: "localhost",
          username: "root",
          password: "root",
        },
      },
      yaml: {
        array: [10, 20, 30],
        bar: 1010,
        baz: 10.1,
        foo: "foo string",
        object: {
          object1: "object 1",
          object2: "object 1",
        },
      },
      json: {
        array: [10, 20, 30],
        bar: 1010,
        baz: 10.1,
        foo: "foo string",
        object: {
          object1: "object 1",
          object2: "object 1",
        },
      },
    })
  })

  // it("load fail", async () => {
  //   expect.assertions(2)
  //   try {
  //     await loader.load(resolve("stubs/unknown.yaml"))
  //   } catch (e) {
  //     expect(e.code).toBe("ENOENT")
  //     expect(e.errno).toBe(-2)
  //   }
  // })

  // it("loadSync success", () => {
  //   expect.assertions(1)
  //   expect(loader.loadSync(resolve("stubs/yaml.yaml"))).toEqual({
  //     array: [10, 20, 30],
  //     bar: 1010,
  //     baz: 10.1,
  //     foo: "foo string",
  //     object: {
  //       object1: "object 1",
  //       object2: "object 1",
  //     },
  //   })
  // })

  // it("loadSync fail", () => {
  //   expect.assertions(2)
  //   try {
  //     loader.loadSync(resolve("stubs/unknown.yaml"))
  //   } catch (e) {
  //     expect(e.code).toBe("ENOENT")
  //     expect(e.errno).toBe(-2)
  //   }
  // })
})
