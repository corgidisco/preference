
import Preference from "./Preference"
import * as types from "./types"

export function create(options?: types.PreferenceOptions): Preference {
  return new Preference(options)
}

const preference = create()

export default preference

export const load = preference.load.bind(preference)
export const loadSync = preference.loadSync.bind(preference)
