
import {Preference} from "./Preference"
import * as types from "./types"

export * from "./loaders"

export function create(options?: types.PreferenceOptions): Preference {
  return new Preference(options || {})
}

export default Preference.shared

export const load = <P>(path: string) => Preference.shared.load<P>(path)
export const loadSync = <P>(path: string) => Preference.shared.loadSync<P>(path)
