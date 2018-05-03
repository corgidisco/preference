
import {} from "jest"

import Preference from "../dist/Preference"
import {resolve as pathResolve} from "path"
import {Loader} from "../src/types"
import * as dotenv from "dotenv"

function resolve(...dir: string[]): string {
  return pathResolve(__dirname, "..", ...dir)
}

dotenv.config({
  path: resolve("test/stubs/service"),
})

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

const yamlOnlyPrefExpected = {
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

  dotenv.config({
    path: resolve("test/stubs/service/.env"),
  })

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
