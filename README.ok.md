# Preference

[![Downloads](https://img.shields.io/npm/dt/preference.svg)](https://npmcharts.com/compare/preference?minimal=true)
[![Version](https://img.shields.io/npm/v/preference.svg)](https://www.npmjs.com/package/preference)
[![License](https://img.shields.io/npm/l/preference.svg)](https://www.npmjs.com/package/preference)

[![NPM](https://nodei.co/npm/preference.png)](https://www.npmjs.com/package/preference)

Load all config files(`yaml`, `json`, `toml`, `ini`) and directory into one object. Typescript and Javascript support.

## Install

```
npm install preference --save
```

## Usage

```js
import pref from "preference" // const pref = require("preference") 

// promise
pref.load("./your_config_directory").then(/* ... */)
await pref.load("./your_config_directory") // you can use promise by await

// sync
pref.loadSync("./your_config_directory")
```

## Examples

Example with `dotenv`.

[Example Directory](https://github.com/corgidisco/preference/tree/master/test/stubs/service)

**Code**

```js
const path = require("path")
const dotenv = require("dotenv") // if you want to use dotenv
const pref = require("preference")

dotenv.config({
  path: path.resolve(process.cwd(), "config/.env")
})
pref.load(path.resolve(process.cwd(), "config")).then(config => {
  console.log(config) // output
})
```

**Output**

```json
{
  "cache": {
    "default": {
      "username": "cache",
      "password": "cache123"
    }
  },
  "client": {
    "api": {
      "host": "127.0.0.1",
      "port": "8080",
      "middleware": [
        "cors",
        "auth",
      ]
    }
  },
  "database": {
    "keyvalue": {
      "host": "localhost",
      "port": 6379
    },
    "master": {
      "host": "localhost",
      "username": "master",
      "password": "master123"
    },
    "slave": {
      "host": "slavehost",
      "username": "slave",
      "password": "slave123"
    }
  }
}
```

## Formats

- `js` (built-in)
- `json` (built-in)
- `ini` (require `npm install ini --save`)
- `yaml` (require `npm install js-yaml --save`)
- `toml` (require `npm install toml --save`)