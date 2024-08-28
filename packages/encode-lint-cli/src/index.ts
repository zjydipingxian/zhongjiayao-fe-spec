import ora from 'ora'
import type { Ora } from 'ora'
import { PKG_NAME } from './utils/constants'
import initAction from './actions/init'
import scanAction from './actions/scan'
import type { InitOptions, ScanOptions } from './types'
import printReport from './utils/print-report'

type OraKey = keyof Ora
type IInitOptions = Omit<InitOptions, 'checkVersionUpdate'>
export const init = async (options: IInitOptions) => {
  return initAction({
    ...options,
    checkVersionUpdate: false,
  })
}

export const scan = async (options: ScanOptions) => {
  const checking = ora()
  checking.start(`执行 ${PKG_NAME} 代码检查`)
  try {
    const report = await scanAction(options)
    const { results, errorCount, warningCount } = report
    let type: OraKey = 'succeed'
    if (errorCount > 0) {
      type = 'fail'
    } else if (warningCount > 0) {
      type = 'warn'
    }

    checking[type]()
    if (results.length > 0) printReport(results, false)

    return report
  } catch (error) {
    console.log('🚀 ~ scan ~ error:', error)
  }
}
