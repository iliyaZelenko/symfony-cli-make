/**
 * Конвертирует путь в namespace
 *
 * @param {string} path
 * @param {string} prefix
 * @return {string}
 */
export declare function covertPathToNamespace(path: string, prefix?: string): string;
/**
 * Конвертирует введенный путь в понятный для Node.js формат.
 *
 * @param {string} path
 * @return {string} joined path by OC separator
 */
export declare function covertInputPath(path: string): string;
/**
 * Возвращает путь к папке src.
 * Рекурсивно поднимается по директория вверх.
 *
 * @param {string} srcFolder name of src folder
 * @param {string} startPath
 * @return {string} "src" folder path
 */
export declare function getSrcDir(srcFolder?: string, startPath?: string): string;
