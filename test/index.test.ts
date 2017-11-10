
import {} from "jest"

import pref from "../dist/index"
import {create, load as prefLoad, loadSync as prefLoadSync} from "../dist/index"
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

describe("preference", () => {
  it("default load success", async () => {
    expect.assertions(1)
    await expect(pref.load(resolve("test/stubs"))).resolves.toEqual(expected)
  })

  it("default loadSync success", () => {
    expect.assertions(1)
    expect(pref.loadSync(resolve("test/stubs"))).toEqual(expected)
  })

  it("direct load success", async () => {
    expect.assertions(1)
    await expect(prefLoad(resolve("test/stubs"))).resolves.toEqual(expected)
  })

  it("direct loadSync success", () => {
    expect.assertions(1)
    expect(prefLoadSync(resolve("test/stubs"))).toEqual(expected)
  })
})
