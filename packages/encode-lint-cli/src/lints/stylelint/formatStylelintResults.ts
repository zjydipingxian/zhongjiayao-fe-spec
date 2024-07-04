import { LintResult } from 'stylelint'
import type { ScanResult } from '../../types'
import { getStylelintRuleDocUrl } from './getStylelintDocUrl'

/**
 * 格式化stylelint的检查结果。
 *
 * @param results stylelint的检查结果数组，每个结果包含源文件和警告信息。
 * @param quiet 是否只显示错误，不显示警告。true表示只显示错误。
 * @returns 返回格式化后的检查结果数组，每个结果包含文件路径、消息、错误和警告计数。
 */
/**
 * 格式化 Stylelint 输出结果
 */
export function formatStylelintResults(
  results: LintResult[],
  quiet: boolean
): ScanResult[] {
  // 遍历每个检查结果，格式化为统一的输出格式
  return results.map(({ source, warnings }) => {
    const filePath = source || ''

    // 初始化错误和警告计数
    let errorCount = 0
    let warningCount = 0

    // 过滤和格式化警告消息
    const messages = warnings
      .filter((item) => !quiet || item.severity === 'error')
      .map((item) => {
        const { line = 0, column = 0, rule, severity, text } = item
        if (severity === 'error') {
          errorCount++
        } else {
          warningCount++
        }
        // 格式化消息文本，移除规则名称的括号，为规则提供文档链接
        return {
          line,
          column,
          rule,
          url: getStylelintRuleDocUrl(rule),
          message: text
            .replace(/([^ ])\.$/u, '$1')
            .replace(new RegExp(`\\(${rule}\\)`), ''),
          errored: severity === 'error',
        }
      })

    return {
      filePath,
      messages,
      errorCount,
      warningCount,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
    }
  })
}
