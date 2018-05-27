
import {Preference, PreferenceConfig} from "./preference"

export function create(options?: PreferenceConfig): Preference {
  return new Preference(options || {})
}
