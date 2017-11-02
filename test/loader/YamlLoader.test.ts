
import {} from "jest"

import YamlLoader from "../../src/loader/YamlLoader"
import path from "path"

function resolve(...dir: string[]): string {
  return path.resolve(__dirname, "..", ...dir)
}

describe("YamlLoader", () => {

  const loader = new YamlLoader()

  it("load yaml file successfully", async () => {
    expect.assertions(1)
    await expect(loader.load(resolve("stubs/yaml.yaml"))).resolves.toEqual({
      array: [10, 20, 30],
      bar: 1010,
      baz: 10.1,
      foo: "foo string",
      object: {
        object1: "object 1",
        object2: "object 1",
      },
    })
  })

  it("cannot load yaml file", async () => {
    expect.assertions(3)
    try {
      await loader.load(resolve("stubs/unknown.yaml"))
    } catch (e) {
      expect(e.code).toBe("ENOENT")
      expect(e.errno).toBe(-2)
      expect(e.message).toEqual("ENOENT: no such file or directory, open '/Users/wan2land/Workspace/js/allconf/test/stubs/unknown.yaml'")
    }
  })
})
