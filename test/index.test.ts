
import {} from "jest"

import pref from "../dist/index"
import {create, load as prefLoad, loadSync as prefLoadSync} from "../dist/index"
import * as path from "path"
import * as dotenv from "dotenv"

function resolve(...dir: string[]): string {
  return path.resolve(__dirname, "..", ...dir)
}

const expected = {
  cache: {
    default: {
      username: "cache",
      password: "cache123",
    },
  },
  client: {
    api: {
      host: "127.0.0.1",
      middleware: [
        "cors",
        "auth",
      ],
      port: "8080",
    },
  },
  database: {
    keyvalue: {
      host: "localhost",
      port: 6379,
    },
    master: {
      host: "localhost",
      username: "master",
      password: "master123",
    },
    slave: {
      host: "slavehost",
      username: "slave",
      password: "slave123",
    },
  },
}

describe("preference", () => {
  dotenv.config({
    path: resolve("test/stubs/service/.env"),
  })

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
