const init = require('../lib/index.js')

describe('init function', () => {
  it('should call initAction with options and checkVersionUpdate set to false', async () => {
    // 假设initAction是一个可mock的函数，这里进行mock
    const mockInitAction = jest.fn().mockResolvedValueOnce('Expected result')
    jest.mock('../lib/actions/init.js', () => ({
      initAction: mockInitAction,
    }))

    const options = {} // Replace with actual properties you want to test
    await init(options)

    // 确保initAction被正确调用了
    expect(mockInitAction).toHaveBeenCalledTimes(1)
    expect(mockInitAction).toHaveBeenCalledWith({
      ...options,
      checkVersionUpdate: false,
    })
  })

  // 可以根据需要添加更多的测试用例
})
