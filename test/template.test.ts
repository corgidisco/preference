
import "jest"

import { create } from "../dist/template"

describe("template", () => {

  it("default template", () => {
    expect(create("hello <%=name%>!")({name: "cris!"})).toEqual("hello cris!!")
  })

  it("yaml template", () => {
    expect(create(`name: <%=name%>
username: corgidisco`)({name: "cris!!"})).toEqual(`name: cris!!
username: corgidisco`)
  })

  it("json template", () => {
    expect(create(`{
  "name": "<%=name%>",
  "username": "corgidisco"
}`)({name: "cris!!!"})).toEqual(`{
  "name": "cris!!!",
  "username": "corgidisco"
}`)
  })
})
