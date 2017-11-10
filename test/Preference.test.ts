
import {} from "jest"

import Preference from "../dist/Preference"
import * as path from "path"

function resolve(...dir: string[]): string {
  return path.resolve(__dirname, "..", ...dir)
}

const expected = {
  DEBUG: "true",
  ENV: "production",
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


describe("Preference", () => {

  const pref = new Preference()

  it("load success", async () => {
    expect.assertions(1)
    await expect(pref.load(resolve("test/stubs/service"))).resolves.toEqual(expected)
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
    expect(pref.loadSync(resolve("test/stubs/service"))).toEqual(expected)
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
