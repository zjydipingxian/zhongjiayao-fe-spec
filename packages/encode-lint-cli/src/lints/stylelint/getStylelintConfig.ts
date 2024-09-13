import path from 'path'
import fs from 'fs-extra'
import { LinterOptions } from 'stylelint'
import { Config, PKG, ScanOptions } from '../../types'
import { glob } from 'glob'
import { STYLELINT_IGNORE_PATTERN } from '../../utils/constants'

/**
 * 获取stylelint配置。
 *
 * 此函数根据提供的选项、包信息和配置对象，生成并返回一个stylelint配置对象。
 * 如果配置中禁用了stylelint，将返回一个空对象。
 *
 * @param opts 扫描选项，包括当前工作目录和是否修复错误。
 * @param pkg 包信息，用于检查是否在package.json中指定了stylelint配置。
 * @param config 配置对象，包含是否启用stylelint和可能的stylelint选项。
 * @returns 返回stylelint配置对象，如果禁用了stylelint，则返回空对象。
 */
export function getStylelintConfig(opts: ScanOptions, pkg: PKG, config: Config): LinterOptions {
  const { cwd, fix } = opts
  if (config.enableStylelint === false) {
    return {}
  }

  const lintConfig: any = {
    fix: Boolean(fix),
    allowEmptyInput: true,
  }

  if (config.stylelintOptions) {
    Object.assign(lintConfig, config.stylelintOptions)
  } else {
    // 使用glob同步查找当前工作目录下的stylelint配置文件
    // 默认扫描 项目的目录中，有没有 lintrc的规范文件， 如果有，就使用这默认的lint的配置
    const lintConfigFiles = glob.sync('.stylelintrc?(.@(js|yaml|yml|json))', { cwd })

    // 如果没有找到配置文件，且package.json中没有stylelint配置，则指定默认配置
    if (lintConfigFiles.length === 0 && !pkg.stylelint) {
      lintConfig.config = {
        extends: 'stylelint-config-code',
      }
    }

    // 根据扫描目录下有无stylelintignore忽略文件，若无则使用默认的 ignore 配置
    const ignoreFilePath = path.resolve(cwd, '.stylelintignore')
    if (!fs.existsSync(ignoreFilePath)) {
      lintConfig.ignorePattern = STYLELINT_IGNORE_PATTERN
    }
  }

  return lintConfig
}
