
export interface Loader {
  test(filename: string): boolean
  load(path: string): Promise<any>
  loadSync(path: string): any
}

export interface TestableLoader extends Loader {
  test(path: string): boolean
}

export interface PreferenceOptions {
  noIgnoreErrors?: boolean // default false
  loaders?: Loader[]
}
