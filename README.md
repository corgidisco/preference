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

// sync
pref.loadSync("./your_config_directory")
```

[Example Directory](https://github.com/corgidisco/preference/tree/master/test/stubs)

### output

```json
{
  database: {
    mysql: {
      host: "localhost",
      username: "root",
      password: "root",
    },
  },
  ini: {
    array: ["10", "20", "30"],
    bar: "1010",
    baz: "10.1",
    foo: "foo string",
    object: {
      object1: "object 1",
      object2: "object 1",
    },
  },
  yaml: {
    array: [10, 20, 30],
    bar: 1010,
    baz: 10.1,
    foo: "foo string",
    object: {
      object1: "object 1",
      object2: "object 1",
    },
  },
  json: {
    array: [10, 20, 30],
    bar: 1010,
    baz: 10.1,
    foo: "foo string",
    object: {
      object1: "object 1",
      object2: "object 1",
    },
  },
  toml: {
    array: [10, 20, 30],
    bar: 1010,
    baz: 10.1,
    foo: "foo string",
    object: {
      object1: "object 1",
      object2: "object 1",
    },
  }
}
```

## Formats

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
