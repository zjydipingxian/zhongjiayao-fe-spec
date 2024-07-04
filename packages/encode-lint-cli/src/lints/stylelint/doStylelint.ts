import fg from 'fast-glob'
import stylelint from 'stylelint'
import { extname, join } from 'path'
import { PKG, ScanOptions } from '../../types'
import {
  STYLELINT_FILE_EXT,
  STYLELINT_IGNORE_PATTERN,
} from '../../utils/constants'
import { getStylelintConfig } from './getStylelintConfig'
import { formatStylelintResults } from './formatStylelintResults'

export interface DoStylelintOptions extends ScanOptions {
  pkg: PKG
}


/**
 * 执行stylelint校验的接口。
 * 
 * @param options:DoStylelintOptions - 包含各种配置选项的对象。
 * @param options.pkg - 项目的package.json信息。
 * @param options.files - 明确指定需要校验的文件列表。
 * @param options.include - 包含需要搜索的文件路径。
 * @param options.cwd - 当前工作目录。
 * @param options.quiet - 是否只输出错误信息。
 * @returns 格式化后的stylelint校验结果。
 */
export async function doStylelint(options: DoStylelintOptions) {
  let files: string[] = []
  if (options.files) {
    // 从给定的文件列表中筛选出需要进行 stylelint 格式化的文件
    files = options.files.filter((name) =>
      STYLELINT_FILE_EXT.includes(extname(name))
    )
  } else {
    const pattern = join(
      options.include,
      `**/*.{${STYLELINT_FILE_EXT.map((t) => t.replace(/^\./, '')).join(',')}}`
    )

    // 使用fast-glob库，根据构建的模式在指定的工作目录中搜索文件,  同时忽略掉stylelint配置中指定的忽略文件模式
    files = await fg(pattern, {
      cwd: options.cwd,
      ignore: STYLELINT_IGNORE_PATTERN,
    })
  }
  // 使用stylelint进行校验，并等待结果
  const data = await stylelint.lint({
    ...getStylelintConfig(options, options.pkg, options.config || {}),
    files,
  })

  // 根据options.quiet配置，格式化stylelint校验结果
  return formatStylelintResults(data.results, Boolean(options.quiet))
}
