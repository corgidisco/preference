
export interface Loader {
  load(path: string): Promise<any>
  loadSync(path: string): any
}

export interface TestableLoader extends Loader {
  test(path: string): boolean
}

export interface PreferenceOptions {
  dotenvLoader?: Loader,
  yamlLoader?: Loader,
  jsonLoader?: Loader,
  tomlLoader?: Loader,
  iniLoader?: Loader,
  noIgnoreErrors?: boolean, // default false
}
