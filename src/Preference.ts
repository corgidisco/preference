
import * as types from "./types"

export default class Preference {

  private options: types.PreferenceOptions

  constructor(options?: types.PreferenceOptions) {
    this.options = (options || {}) as types.PreferenceOptions
  }

  public load(path: string): any {
    return ""
  }
}
