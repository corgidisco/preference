
import {} from "jest"

import Preference from "../dist/Preference"
import * as path from "path"

function resolve(...dir: string[]): string {
  return path.resolve(__dirname, "..", ...dir)
}

const expected = {
  DEBUG: "true",
  ENV: "production",
  database: {
    mysql: {
      host: "localhost",
      username: "root",
      password: "root",
    },
  },
  ini: {
    array: ["10", "20", "30"],
    bar: "1010",
    baz: "10.1",
    foo: "foo string",
    object: {
      object1: "object 1",
      object2: "object 1",
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
  toml: {
    array: [10, 20, 30],
    bar: 1010,
    baz: 10.1,
    foo: "foo string",
    object: {
      object1: "object 1",
      object2: "object 1",
    },
  },
}

describe("Preference", () => {

  const pref = new Preference()

  it("load success", async () => {
    expect.assertions(1)
    await expect(pref.load(resolve("test/stubs"))).resolves.toEqual(expected)
  })

  it("load fail", async () => {
    expect.assertions(2)
    try {
      await pref.load(resolve("stubs/unknown"))
    } catch (e) {
      expect(e.code).toBe("ENOENT")
      expect(e.errno).toBe(-2)
    }
  })

  it("loadSync success", () => {
    expect.assertions(1)
    expect(pref.loadSync(resolve("test/stubs"))).toEqual(expected)
  })

  it("loadSync fail", () => {
    expect.assertions(2)
    try {
      pref.loadSync(resolve("stubs/unknown"))
    } catch (e) {
      expect(e.code).toBe("ENOENT")
      expect(e.errno).toBe(-2)
    }
  })
})
