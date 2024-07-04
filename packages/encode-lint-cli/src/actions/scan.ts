import fs from 'fs-extra'
import path from 'path'

import type { Config, PKG, ScanOptions, ScanReport, ScanResult } from '../types'
import { PKG_NAME } from '../utils/constants'
import { doPrettier, doStylelint , doMarkdownlint} from '../lints/index'

export default async (options: ScanOptions): Promise<ScanReport> => {
  const { cwd, fix, outputReport, config: scanConfig } = options
  // 用于读取指定路径的配置文件，并返回配置文件的模块对象。如果路径不存在，则返回一个空对象。
  const readConfigFile = (pth: string): any => {
    const localPath = path.resolve(cwd, pth)
    return fs.existsSync(localPath) ? require(localPath) : {}
  }

  const pkg: PKG = readConfigFile('package.json')
  const config: Config = scanConfig || readConfigFile(`${PKG_NAME}.config.js`)


  // 记录错误信息
  const runErrors: Error[] = []

  // 扫描结果
  let results: ScanResult[] = []


  // prettier
  if (fix && config.enablePrettier !== false) {
    await doPrettier(options);
  }

  // eslint
  if (config.enableESLint !== false) {
    try {
      // const eslintResults = await doESLint({ ...options, pkg, config });
    //   results = results.concat(eslintResults);
    } catch (e) {
      runErrors.push(e as Error)
    }
  }


  // stylelint
  if (config.enableStylelint !== false) {
    try {
      const stylelintResults = await doStylelint({ ...options, pkg, config });
      results = results.concat(stylelintResults);
    } catch (e) {
      runErrors.push(e as Error);
    }
  }

  // markdown
  if (config.enableMarkdownlint !== false) {
    try {
      const markdownlintResults = await doMarkdownlint({ ...options, pkg, config });
      results = results.concat(markdownlintResults);
    } catch (e) {
      runErrors.push(e as Error);
    }
  }

  // 生成报告报告文件
  if (outputReport) {
    const reportPath = path.resolve(process.cwd(), `./${PKG_NAME}-report.json`);
    fs.outputFile(reportPath, JSON.stringify(results, null, 2), () => {});
  }




  return {
    results,
    errorCount: results.reduce(
      (count, { errorCount }) => count + errorCount,
      0
    ),
    warningCount: results.reduce(
      (count, { warningCount }) => count + warningCount,
      0
    ),
    runErrors,
  }
}
