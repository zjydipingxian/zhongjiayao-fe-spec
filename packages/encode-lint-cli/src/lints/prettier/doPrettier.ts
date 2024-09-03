import os from 'os'
import fg from 'fast-glob'
import { readFile, writeFile } from 'fs-extra'
import { extname, normalize, join } from 'path'
import prettier from 'prettier'
import { ScanOptions } from '../../types'
import { PRETTIER_FILE_EXT, PRETTIER_IGNORE_PATTERN } from '../../utils/constants'

// 获取操作系统类型
const platform = os.platform()

export interface DoPrettierOptions extends ScanOptions {}
export async function doPrettier(options: DoPrettierOptions) {
  let files: string[] = []
  if (options.files) {
    // 从给定的文件列表中筛选出需要进行Prettier格式化的文件
    files = options.files.filter((name) => PRETTIER_FILE_EXT.includes(extname(name)))
  } else {
    // 用`**/*.{js,jsx,ts,tsx}`这样的模式，匹配指定目录下所有的.js、.jsx、.ts和.tsx文件
    const pattern = join(`**/*.{${PRETTIER_FILE_EXT.map((t) => t.replace(/^\./, '')).join(',')}}`)

    // 使用fast-glob库，根据构建的模式在指定的工作目录中搜索文件,  同时忽略掉prettier配置中指定的忽略文件模式
    files = await fg(normalizePath(pattern, platform), {
      cwd: options.cwd,
      ignore: PRETTIER_IGNORE_PATTERN,
    })
  }

  await Promise.all(files.map(formatFile))
}

async function formatFile(filepath: string) {
  // 读取文件内容
  const text = await readFile(filepath, 'utf8')
  // 解析文件的prettier配置
  const options = await prettier.resolveConfig(filepath)
  // 使用prettier格式化文件内容
  const formatted = prettier.format(text, { ...options, filepath })
  // 将格式化后的内容写回原文件
  await writeFile(filepath, await formatted, 'utf8')
}

function normalizePath(pattern: string, platform: string): string {
  let normalizedPattern = pattern
  if (platform === 'win32') {
    normalizedPattern = normalize(pattern).replace(/\\/g, '/')
  }
  return normalizedPattern
}
