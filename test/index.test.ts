
import {} from "jest"

import * as preference from "../dist/index"
import * as path from "path"
import * as dotenv from "dotenv"

function resolve(...dir: string[]): string {
  return path.resolve(__dirname, "..", ...dir)
}

const expected = require("./expected.json") // tslint:disable-line

describe("preference", () => {
  dotenv.config({
    path: resolve("test/stubs/service/.env"),
  })

  it("default load success", async () => {
    expect.assertions(1)
    await expect(preference.load(resolve("test/stubs/service"))).resolves.toEqual(expected)
  })

  it("default loadSync success", () => {
    expect.assertions(1)
    expect(preference.loadSync(resolve("test/stubs/service"))).toEqual(expected)
  })
})
