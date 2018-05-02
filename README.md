# Preference

All config library. Typescript and Javascript support.

## Install

```
npm install preference --save
```

## Usage

```js
import pref from "preference"

// promise
pref.load("./your_config_directory").then(/* ... */)
await pref.load("./your_config_directory") // you can use promise by await

// sync
pref.loadSync("./your_config_directory")
```

[Example Directory](https://github.com/corgidisco/preference/tree/master/test/stubs/service)

### output

```json
{
  "cache": {
    "default": {
      "database": "redis",
      "prefix": "cache_",
      "table": "caches"
    }
  },
  "client": {
    "server": {
      "host": "localhost",
      "middleware": [
        "middleware1",
        "middleware2",
        "middleware3"
      ],
      "port": "8080"
    }
  },
  "database": {
    "keyvalue": {
      "driver": "redis",
      "host": "localhost",
      "port": 6379
    },
    "master": {
      "driver": "mysql",
      "host": "localhost",
      "password": "root",
      "port": 3306,
      "username": "root"
    },
    "slave": {
      "database": "slave",
      "driver": "mysql",
      "host": "localhost",
      "password": "slave",
      "port": 3306,
      "username": "slave"
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

## Options

```js
import preference from "preference"

const pref = preference.create({
  /* options */
})
```
