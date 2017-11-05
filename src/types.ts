
export interface Loader {
  load(path: string): Promise<any>
  loadSync(path: string): any
}

export interface PreferenceOptions {

}
