# ⚙️ Preference

[![Build](https://travis-ci.org/corgidisco/preference.svg?branch=master)](https://travis-ci.org/corgidisco/preference)
[![Downloads](https://img.shields.io/npm/dt/preference.svg)](https://npmcharts.com/compare/preference?minimal=true)
[![Version](https://img.shields.io/npm/v/preference.svg)](https://www.npmjs.com/package/preference)
[![License](https://img.shields.io/npm/l/preference.svg)](https://www.npmjs.com/package/preference)

[![dependencies Status](https://david-dm.org/corgidisco/preference/status.svg)](https://david-dm.org/corgidisco/preference)
[![devDependencies Status](https://david-dm.org/corgidisco/preference/dev-status.svg)](https://david-dm.org/corgidisco/preference?type=dev)

[![NPM](https://nodei.co/npm/preference.png)](https://www.npmjs.com/package/preference)

Load various config files(`yaml`, `json`, `toml`, `ini`) and directory into one object. support Javascript(& Typescript).

## Install

```
npm install preference --save
```

## Usage

import library,

```ts
const preference = require("preference") 
// or
import * as preference from "preference" // typescript
```

then, use like this:

```js
// promise
preference.load("./your_config_directory").then(/* ... */)
await preference.load("./your_config_directory") // you can use promise by await

// sync
preference.loadSync("./your_config_directory")
```

## Examples

Example with `dotenv`.

[Example Directory](https://github.com/corgidisco/preference/tree/master/test/stubs/service)

**Code**

```js
const path = require("path")
const dotenv = require("dotenv") // if you want to use dotenv
const preference = require("preference")

dotenv.config({
  path: path.resolve(process.cwd(), "config/.env")
})
preference.load(path.resolve(process.cwd(), "config")).then(config => {
  console.log(config) // output
})
```

**Output**

@code("./test/expected.json")

## Support Formats

- `js` (built-in)
- `json` (built-in)
- `ini`, `cfg`, `conf` (require `npm install ini --save`)
- `yaml` (require `npm install js-yaml --save`)
- `toml` (require `npm install toml --save`)

## Configs

```typescript
preference.create(/* preference.PreferenceConfig */)
```

option         | type                 | default
-------------- | -------------------- | ------------------------------------------------
noIgnoreErrors | boolean              | `false`
loaders        | preference.Loader[]  | `[YamlLoader, JsonLoader, TomlLoader, IniLoader, JsLoader]`

## Custom Loader

@code("./test/readme.test.ts@custom-loader")
