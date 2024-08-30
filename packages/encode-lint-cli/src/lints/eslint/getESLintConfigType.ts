import { glob } from 'glob'
import type { PKG } from '../../types.ts'

export function getESLintConfigType(cwd: string, pkg: PKG): string {
  const tsFiles = glob.sync('./!(node_modules)/**/*.@(ts|tsx)', { cwd })
  const reactFiles = glob.sync('./!(node_modules)/**/*.@(jsx|tsx)', { cwd })
  const vueFiles = glob.sync('./!(node_modules)/**/*.vue', { cwd })
  console.log('🚀 ~ getESLintConfigType ~ vueFiles:', vueFiles)
  const dependencies = Object.keys(pkg.dependencies || {})
  console.log('🚀 ~ getESLintConfigType ~ dependencies:', dependencies)
  const language = tsFiles.length > 0 ? 'typescript' : ''
  console.log('🚀 ~ getESLintConfigType ~ language:', language)
  let dsl = ''

  // dsl判断
  if (reactFiles.length > 0 || dependencies.some((name) => /^react(-|$)/.test(name))) {
    dsl = 'react'
  } else if (vueFiles.length > 0 || dependencies.some((name) => /^vue(-|$)/.test(name))) {
    dsl = 'vue'
  } else if (dependencies.some((name) => /^rax(-|$)/.test(name))) {
    dsl = 'rax'
  }
  console.log(
    '🚀 ~ getESLintConfigType ~ dsl:',
    'eslint-rules-config/' + `${language}/${dsl}`.replace(/\/$/, '/index').replace(/^\//, ''),
  )

  return 'eslint-rules-config/' + `${language}/${dsl}`.replace(/\/$/, '/index').replace(/^\//, '')
}
