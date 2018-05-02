
import {} from "jest"

import pref from "../dist/index"
import {create, load as prefLoad, loadSync as prefLoadSync} from "../dist/index"
import * as path from "path"

function resolve(...dir: string[]): string {
  return path.resolve(__dirname, "..", ...dir)
}

const expected = {
  cache: {
    default: {
      database: "redis",
      prefix: "cache_",
      table: "caches",
    },
  },
  client: {
    server: {
      host: "localhost",
      middleware: [
        "middleware1",
        "middleware2",
        "middleware3",
      ],
      port: "8080",
    },
  },
  database: {
    keyvalue: {
      driver: "redis",
      host: "localhost",
      port: 6379,
    },
    master: {
      driver: "mysql",
      host: "localhost",
      password: "root",
      port: 3306,
      username: "root",
    },
    slave: {
      database: "slave",
      driver: "mysql",
      host: "localhost",
      password: "slave",
      port: 3306,
      username: "slave",
    },
  },
}

describe("preference", () => {
  it("default load success", async () => {
    expect.assertions(1)
    await expect(pref.load(resolve("test/stubs/service"))).resolves.toEqual(expected)
  })

  it("default loadSync success", () => {
    expect.assertions(1)
    expect(pref.loadSync(resolve("test/stubs/service"))).toEqual(expected)
  })

  it("direct load success", async () => {
    expect.assertions(1)
    await expect(prefLoad(resolve("test/stubs/service"))).resolves.toEqual(expected)
  })

  it("direct loadSync success", () => {
    expect.assertions(1)
    expect(prefLoadSync(resolve("test/stubs/service"))).toEqual(expected)
  })
})
