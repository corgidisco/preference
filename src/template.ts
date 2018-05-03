
const cached: any = {}
export function createWithCache(context: string): (data: any) => string {
  if (cached[context]) {
    return cached[context]
  }
  return cached[context] = create(context)
}

const stringEscapes: any = {
  "\\": "\\",
  "'": "'",
  "\n": "n",
  "\r": "r",
  "\u2028": "u2028",
  "\u2029": "u2029",
}

export function create(context: string): (data: any) => string {
  const func = "return function(obj){obj=obj||{};with(obj){return'"
    + context
      .replace(/['\n\r\u2028\u2029\\]/g, (match) => `\\${stringEscapes[match]}`)
      .replace(/<%=([\s\S]+?)%>/g, (_, match) => `'+(${match})+'`)
    + "'}}"

  return (Function(func))() as (data: any) => string
}
