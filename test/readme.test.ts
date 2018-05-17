
import {} from "jest"

import * as preference from "../dist/index"

import * as path from "path"
import * as dotenv from "dotenv"

describe("readme", () => {

  dotenv.config({
    path: path.resolve(__dirname, "stubs/service/.env"),
  })

  it("test custom loader", async () => {
    expect.assertions(1)

    // section:custom-loader
    const customLoader: preference.Loader = {
      test(filename: string): boolean {
        return /\.json$/i.test(filename)
      },
      async load(dirname: string): Promise<any> {
        return {message: "load async", dirname}
      },
      loadSync(dirname: string): any {
        return {message: "load sync", dirname}
      },
    }

    const pref = preference.create({
      loaders: [
        customLoader,
        new preference.YamlLoader(),
      ],
    })
    // endsection

    await expect(pref.load(path.resolve(__dirname, "stubs/service/database"))).resolves.toEqual({
      keyvalue: { host: "localhost", port: 6379 },
      master: {
        host: "localhost",
        username: "master",
        password: "master123",
      },
      slave: {
        message: "load async",
        dirname: "/Users/wan2land/Workspace/wandu/preference.ts/test/stubs/service/database/slave.json",
      },
    })
  })
})
