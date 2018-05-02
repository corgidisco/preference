
import {} from "jest"

import Preference from "../dist/Preference"
import {resolve as pathResolve} from "path"
import {Loader} from "../src/types"

function resolve(...dir: string[]): string {
  return pathResolve(__dirname, "..", ...dir)
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

const yamlOnlyPrefExpected = {
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
  },
}

const errorOccuredYamlLoader: Loader = {
  test(filename: string): boolean {
    return /\.ya?ml$/.test(filename)
  },
  async load(path: string): Promise<any> {
    require("wrong_package_name")
  },
  loadSync(path: string): any {
    require("wrong_package_name")
  },
}

describe("Preference.load", () => {

  const pref = new Preference()

  it("will be success", async () => {
    expect.assertions(1)
    await expect(pref.load(resolve("test/stubs/service"))).resolves.toEqual(expected)
  })

  it("will be fail", async () => {
    expect.assertions(2)
    try {
      await pref.load(resolve("stubs/unknown"))
    } catch (e) {
      expect(e.code).toBe("ENOENT")
      expect(e.errno).toBe(-2)
    }
  })

  it("will be with yaml only", async () => {
    expect.assertions(1)
    const yamlOnlyPref = new Preference({
      loaders: [
        require("../dist/loader/yaml-loader").default,
      ],
    })
    await expect(yamlOnlyPref.load(resolve("test/stubs/service")))
      .resolves
      .toEqual(yamlOnlyPrefExpected)
  })

  it("error in loader but success", async () => {
    expect.assertions(1)
    const errorPref = new Preference({
      loaders: [
        errorOccuredYamlLoader,
      ],
    })
    await expect(errorPref.load(resolve("test/stubs/service")))
      .resolves
      .toEqual({database: {}})
  })

  it("error in loader", async () => {
    expect.assertions(2)
    const errorPref = new Preference({
      loaders: [
        errorOccuredYamlLoader,
      ],
      noIgnoreErrors: true,
    })
    try {
      await errorPref.load(resolve("test/stubs/service"))
    } catch (e) {
      expect(e.code).toBe("MODULE_NOT_FOUND")
      expect(e.errno).toBeUndefined()
    }
  })
})

describe("Preference.loadSync", () => {

  const pref = new Preference()

  it("will be success", () => {
    expect.assertions(1)
    expect(pref.loadSync(resolve("test/stubs/service"))).toEqual(expected)
  })

  it("will be fail", () => {
    expect.assertions(2)
    try {
      pref.loadSync(resolve("stubs/unknown"))
    } catch (e) {
      expect(e.code).toBe("ENOENT")
      expect(e.errno).toBe(-2)
    }
  })

  it("will be with yaml only", () => {
    expect.assertions(1)
    const yamlOnlyPref = new Preference({
      loaders: [
        require("../dist/loader/yaml-loader").default,
      ],
    })
    expect(yamlOnlyPref.loadSync(resolve("test/stubs/service")))
      .toEqual(yamlOnlyPrefExpected)
  })

  it("error in loader but success", () => {
    expect.assertions(1)
    const errorPref = new Preference({
      loaders: [
        errorOccuredYamlLoader,
      ],
    })
    expect(errorPref.loadSync(resolve("test/stubs/service")))
      .toEqual({database: {}})
  })

  it("error in loader", () => {
    expect.assertions(2)
    const errorPref = new Preference({
      loaders: [
        errorOccuredYamlLoader,
      ],
      noIgnoreErrors: true,
    })
    try {
      errorPref.loadSync(resolve("test/stubs/service"))
    } catch (e) {
      expect(e.code).toBe("MODULE_NOT_FOUND")
      expect(e.errno).toBeUndefined()
    }
  })
})
