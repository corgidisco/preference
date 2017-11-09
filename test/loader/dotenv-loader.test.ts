
import {} from "jest"

import loader from "../../src/loader/dotenv-loader"
import path from "path"

function resolve(...dir: string[]): string {
  return path.resolve(__dirname, "..", ...dir)
}

const expected = {
  DEBUG: "true",
  ENV: "production",
}

describe("ini-loader", () => {

  it("load success", async () => {
    expect.assertions(1)
    await expect(loader.load(resolve("stubs/.env"))).resolves.toEqual(expected)
  })

  it("load fail", async () => {
    expect.assertions(2)
    try {
      await loader.load(resolve("stubs/unknown.env"))
    } catch (e) {
      expect(e.code).toBe("ENOENT")
      expect(e.errno).toBe(-2)
    }
  })

  it("loadSync success", () => {
    expect.assertions(1)
    expect(loader.loadSync(resolve("stubs/.env"))).toEqual(expected)
  })

  it("loadSync fail", () => {
    expect.assertions(2)
    try {
      loader.loadSync(resolve("stubs/unknown.ini"))
    } catch (e) {
      expect(e.code).toBe("ENOENT")
      expect(e.errno).toBe(-2)
    }
  })
})
