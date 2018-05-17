
import {Preference} from "./Preference"
import {PreferenceOptions} from "./types"

export * from "./loaders"
export * from "./types"

export function create(options?: PreferenceOptions): Preference {
  return new Preference(options || {})
}

export default Preference.shared

export const load = <P>(dirname: string) => Preference.shared.load<P>(dirname)
export const loadSync = <P>(dirname: string) => Preference.shared.loadSync<P>(dirname)
