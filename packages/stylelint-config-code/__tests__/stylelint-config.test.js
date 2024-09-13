const assert = require('assert')
const stylelint = require('stylelint')
const path = require('path')

describe('test/stylelint-config.test.js', () => {
  it('Validate sass', async () => {
    const filePaths = [path.join(__dirname, './fixtures/sass-test.scss')]

    const result = await stylelint.lint({
      files: filePaths,
      configFile: path.join(__dirname, '../lib/stylelint-config.js'),
      fix: true, // 自动修复
    })

    if (result && result.errored) {
      const filesResult = JSON.parse(result.output || '[]') || []
      filesResult.forEach((fileResult) => {
        console.log(`========= ${filePaths} ==========`)
        console.log(fileResult.warnings)
      })

      assert.ok(filesResult.length !== 0)
    }
  })
})
