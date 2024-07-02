import { execSync } from 'child_process'
import ora from 'ora';  // 类似 一个 loading
import npmType from '../utils/npm-type'
import log from '../utils/log';
import { PKG_NAME, PKG_VERSION } from '../utils/constants'

/**
 * 检查最新版本号
 */
const checkLatestVersion = async (): Promise<string | null> => {
    const npm = await npmType;
    // 同步执行 获取最新版本号   npm view xxxx version 
    const latestVersion = execSync(`${npm} view ${PKG_NAME} version`).toString('utf-8').trim()

    // 如果版本号相同，则返回 null
    if (PKG_VERSION === latestVersion) return null

    // 将版本号拆分为数组  '1.1.1' -> [1,1,1]
    const compareArr = PKG_VERSION.split('.').map(Number)
    const latestArr = latestVersion.split('.').map(Number)

    for (let i = 0; i < compareArr.length; i++) {
        // 如果当前版本号大于最新版本号，则返回 null
        if (compareArr[i] > latestArr[i]) return null
        // 如果当前版本号小于最新版本号，则返回最新版本号
        if (compareArr[i] < latestArr[i]) return latestVersion
    }
    return latestVersion
}


/**
 * 检查包的版本
 * @param install - 自动安装最新包
 */
export default async (install = true) => {
    const checking = ora(`[${PKG_NAME}] 正在检查最新版本...`)
    // 开始
    checking.start()

    try {
        const npm = await npmType
        // 检查并获取最新版本号
        const latestVersion = await checkLatestVersion()
        // 停止
        checking.stop()

        // 如果有新版本号，并且自动安装
        if (latestVersion && install) {
            const update = ora(`[${PKG_NAME}] 存在新版本，将升级至 ${latestVersion}`)
        
            update.start()
            
            // 同步执行命令 
            execSync(`${npm} i -g ${PKG_NAME}`)
        
            update.stop();
        } else if (latestVersion) {
            log.warn(
                `最新版本为 ${latestVersion}，本地版本为 ${PKG_VERSION}，请尽快升级到最新版本。\n你可以执行 ${npm} install -g ${PKG_NAME}@latest 来安装此版本\n`,
            )
        } else if (install) {
            log.info(`当前没有可用的更新`)
        }

    } catch (error) {
        checking.stop()
        log.error(error as string)
    }

}
