
import {create} from "./preference/create"
import {Preference, PreferenceConfig} from "./preference/preference"
import {IniLoader, JsLoader, JsonLoader, TomlLoader, YamlLoader} from "./loaders"
import {Loader} from "./types"

const shared = create()

const load = <P>(dirname: string) => shared.load<P>(dirname)
const loadSync = <P>(dirname: string) => shared.loadSync<P>(dirname)

export {
  create,
  shared,
  load,
  loadSync,
  Preference,
  PreferenceConfig,
  IniLoader,
  JsLoader,
  JsonLoader,
  TomlLoader,
  YamlLoader,
  Loader,
}
