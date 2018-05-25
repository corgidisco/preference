# Preference

[![Build](https://travis-ci.org/corgidisco/preference.svg?branch=master)](https://travis-ci.org/corgidisco/preference)
[![Downloads](https://img.shields.io/npm/dt/preference.svg)](https://npmcharts.com/compare/preference?minimal=true)
[![Version](https://img.shields.io/npm/v/preference.svg)](https://www.npmjs.com/package/preference)
[![License](https://img.shields.io/npm/l/preference.svg)](https://www.npmjs.com/package/preference)

[![NPM](https://nodei.co/npm/preference.png)](https://www.npmjs.com/package/preference)

Load various config files(`yaml`, `json`, `toml`, `ini`) and directory into one object. support Javascript(& Typescript).

## Install

```
npm install preference --save
```

## Usage

```js
import * as preference from "preference" // const pref = require("preference") 

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

## Custom Loader

```ts
const customLoader: preference.Loader = {
  test(filename: string): boolean {
    return /\.json$/i.test(filename)
  },
  async load(dirname: string): Promise<any> {
    return {message: "load async", dirname}
  },
  loadSync(dirname: string): any {
    return {message: "load sync", dirname}
  },
}

const pref = preference.create({
  loaders: [
    customLoader,
    new preference.YamlLoader(),
  ],
})
```
