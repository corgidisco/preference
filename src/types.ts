
export interface Loader {
  test(filename: string): boolean
  load(path: string): Promise<any>
  loadSync(path: string): any
}
