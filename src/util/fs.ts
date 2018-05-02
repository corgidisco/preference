
import * as fs from "fs"

export function readFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(data.toString())
    })
  })
}

export const readFileSync = fs.readFileSync

export function lstat(path: string): Promise<fs.Stats> {
  return new Promise((resolve, reject) => {
    fs.lstat(path, (err, files) => {
      if (err) {
        reject(err)
        return
      }
      resolve(files)
    })
  })
}

export const lstatSync = fs.lstatSync

export function readdir(path: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err)
        return
      }
      resolve(files)
    })
  })
}

export const readdirSync = fs.readdirSync
