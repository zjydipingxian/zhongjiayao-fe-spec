import path from 'path'
import markdownLint from 'markdownlint'
import markdownLintConfig from 'markdownlint-config-code'
import { Config, PKG, ScanOptions } from '../../types'
import { glob } from 'glob'

type LintOptions = markdownLint.Options & { fix?: boolean }
export function getMarkdownlintConfig(opts: ScanOptions, pkg: PKG, config: Config) {
  const { cwd, fix } = opts
  const lintConfig: LintOptions = {
    fix: Boolean(fix),
    resultVersion: 3,
  }

  if (config.markdownlintOptions) {
    // 若用户传入了 markdownlintOptions，则用用户的
    Object.assign(lintConfig, config.markdownlintOptions)
  } else {
    const lintConfigFiles = glob.sync('.markdownlint(.@(yaml|yml|json))', {
      cwd,
    })

    if (lintConfigFiles.length === 0) {
      lintConfig.config = {
        ...markdownLintConfig,
        'ul-style': { style: 'dash' },
      }
    } else {
      lintConfig.config = markdownLint.readConfigSync(path.resolve(cwd, lintConfigFiles[0]))
    }
  }

  return lintConfig
}
