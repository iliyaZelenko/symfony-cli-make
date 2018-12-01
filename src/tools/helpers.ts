import { normalize, basename, join } from 'path'
import * as fs from 'fs-extra'

/**
 * Конвертирует путь в namespace
 *
 * @param {string} path
 * @param {string} prefix
 * @return {string}
 */
export function covertPathToNamespace (path: string, prefix: string = 'App\\'): string {
  const separator = path.includes('/') ? '\\/' : '\\\\'
  const re = new RegExp(separator,'gi')

  return prefix + path.replace(re, '\\')
}

/**
 * Конвертирует введенный путь в понятный для Node.js формат.
 *
 * @param {string} path
 * @return {string} joined path by OC separator
 */
export function covertInputPath (path: string): string {
  // const separator: string = path.includes('/') ? '/' : '\\'
  // const separatedPath: string[] = path.split(separator)

  // оказывается есть такая удобная ф-я
  return normalize(path) // join(...separatedPath)
}

/**
 * Возвращает путь к папке src.
 * Рекурсивно поднимается по директория вверх.
 *
 * @param {string} srcFolder name of src folder
 * @param {string} startPath
 * @return {string} "src" folder path
 */
export function getSrcDir (srcFolder: string = 'src', startPath: string = __dirname): string {
  const parentPath = normalize(startPath + '/..')

  if (startPath === parentPath) {
    throw Error('Could not find folder.')
  }

  // если папка этого путя совпадает с srcFolder
  if (basename(startPath) === srcFolder) {
    return startPath
  }
  // если этот путь содержит srcFolder (для оптимизации можно написать еще проверку для parentPath в отдельном if)
  if (fs.pathExistsSync(join(startPath, srcFolder))) {
    return join(startPath, srcFolder)
  }

  return getSrcDir(srcFolder, parentPath)
}
