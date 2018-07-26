
import * as path from "path"

import * as pref from "../../../dist/index"

describe("issue1", () => {

  it("default load success", () => {
    const config = pref.loadSync(path.resolve(__dirname))
    expect(config).toEqual({sample: {foo: 10, bar: "bar"}})
  })
})
