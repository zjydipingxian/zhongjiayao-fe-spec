import path from 'path'
import fs from 'fs-extra'
import { glob } from 'glob'
import log from './log'
import { PKG_NAME } from './constants'
import type { PKG } from '../types'
import { confirm } from '@inquirer/prompts'

// 精确移除依赖
const packageNamesToRemove = [
  '@babel/eslint-parser',
  '@commitlint/cli',
  '@iceworks/spec',
  'babel-eslint',
  'eslint',
  'husky',
  'markdownlint',
  'prettier',
  'stylelint',
  'tslint',
]

// 按前缀移除依赖
const packagePrefixesToRemove = ['@commitlint/', '@typescript-eslint/', 'eslint-', 'stylelint-', 'markdownlint-', 'commitlint-']

/**
 * 待删除的无用配置
 * @param cwd
 */
const checkUselessConfig = (cwd: string): string[] => {
  return [
    ...glob.sync('.eslintrc?(.@(yaml|yml|json))', { cwd }),
    ...glob.sync('.stylelintrc?(.@(yaml|yml|json))', { cwd }),
    ...glob.sync('.markdownlint@(rc|.@(yaml|yml|jsonc))', { cwd }),
    ...glob.sync('.prettierrc?(.@(cjs|config.js|config.cjs|yaml|yml|json|json5|toml))', { cwd }),
    ...glob.sync('tslint.@(yaml|yml|json)', { cwd }),
    ...glob.sync('.kylerc?(.@(yaml|yml|json))', { cwd }),
  ]
}

/**
 * 待重写的配置
 * @param cwd
 */
const checkReWriteConfig = (cwd: string) => {
  return glob
    .sync('**/*.ejs', { cwd: path.resolve(__dirname, '../config') })
    .map((name: any) => name.replace(/^_/, '.').replace(/\.ejs$/, ''))
    .filter((filename: any) => fs.existsSync(path.resolve(cwd, filename)))
}

export default async (cwd: string, rewriteConfig?: boolean) => {
  const pkgPath = path.resolve(cwd, 'package.json')
  const pkg: PKG = fs.readJSONSync(pkgPath)
  const dependencies = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || [])]
  const willRemovePackage = dependencies.filter(
    (name) => packageNamesToRemove.includes(name) || packagePrefixesToRemove.some((prefix) => name.startsWith(prefix)),
  )
  console.log('🚀 ~ willRemovePackage:', willRemovePackage)
  const uselessConfig = checkUselessConfig(cwd)
  console.log('🚀 ~ uselessConfig:', uselessConfig)
  const reWriteConfig = checkReWriteConfig(cwd)
  console.log('🚀 ~ reWriteConfig:', reWriteConfig)
  const willChangeCount = willRemovePackage.length + uselessConfig.length + reWriteConfig.length

  // 提示是否移除原配置
  if (willChangeCount > 0) {
    log.warn(`检测到项目中存在可能与 ${PKG_NAME} 冲突的依赖和配置，为保证正常运行将`)

    if (willRemovePackage.length > 0) {
      log.warn('删除以下依赖：')
      log.warn(JSON.stringify(willRemovePackage, null, 2))
    }

    if (uselessConfig.length > 0) {
      log.warn('删除以下配置文件：')
      log.warn(JSON.stringify(uselessConfig, null, 2))
    }

    if (reWriteConfig.length > 0) {
      log.warn('覆盖以下配置文件：')
      log.warn(JSON.stringify(reWriteConfig, null, 2))
    }

    if (typeof rewriteConfig === 'undefined') {
      const isOverWrite = await confirm({
        message: '请确认是否继续：',
      })

      if (!isOverWrite) process.exit(0)
    } else if (!reWriteConfig) {
      process.exit(0)
    }
  }

  // 删除配置文件
  console.log('🚀 ~ uselessConfig:', uselessConfig)
  for (const name of uselessConfig) {
    fs.removeSync(path.resolve(cwd, name))
  }

  // 修正 package.json
  delete pkg.eslintConfig
  delete pkg.eslintIgnore
  delete pkg.stylelint
  console.log('🚀 ~ willRemovePackage:', willRemovePackage)

  for (const name of willRemovePackage) {
    delete (pkg.dependencies || {})[name]
    delete (pkg.devDependencies || {})[name]
  }
  fs.writeFileSync(path.resolve(cwd, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8')

  return pkg
}
