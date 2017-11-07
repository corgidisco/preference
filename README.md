Preference
==========

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
