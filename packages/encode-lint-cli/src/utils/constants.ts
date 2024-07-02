import path from 'path';
import fs from 'fs-extra';

export enum UNICODE {
    success = '\u2714', // ✔
    failure = '\u2716', // ✖
}

// 读取 package.json 
const pkg = fs.readJsonSync(path.resolve(__dirname, '../../package.json'))

/**
 * 包名
 */
export const PKG_NAME: string = pkg.name

/**
 * 包版本号
 */
export const PKG_VERSION: string = pkg.version;